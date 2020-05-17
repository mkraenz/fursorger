import { GameObjects, Scene } from "phaser";
import { setLevel } from "../registry/level";
import { Color, toHex } from "../styles/Color";
import { setDefaultTextStyle, TextConfig } from "../styles/Text";
import { TitleScene } from "./TitleScene";

export class LoadingScene extends Scene {
    private halfWidth!: number;
    private halfHeight!: number;

    constructor() {
        super({ key: "Loading" });
    }

    public preload() {
        this.halfWidth = this.scale.width / 2;
        this.halfHeight = this.scale.height / 2;

        this.preloadAllAssets();
        this.addTitles();
        this.makeLoadingBar();
        setLevel(this.registry, 0);
    }

    private preloadAllAssets() {
        this.load
            .image(
                "rectangleButton",
                " ./assets/images/blank_rectangle60x160.png"
            )
            .image("goodEnd", "./assets/images/goodEnd1280×853.jpg")
            .image("badEnd", "./assets/images/badEnd640x512.jpg")
            .image("city", "./assets/images/town-01-inkarnate387x295.png")
            .image("background", "./assets/images/shoaw-whium.jpg")
            .image("backpack", "./assets/images/backpack64x64.png")
            .image("plus", "./assets/images/plus64x64.png")
            .image("minus", "./assets/images/minus64x64.png")
            .image("hourglass", "./assets/images/hourglass64x64.png")
            .image("background2", "./assets/images/default-background.jpg")
            .image(
                "buildFactory",
                "./assets/images/buildFactoryButton128x128.png"
            )
            .image("balloon", "./assets/images/balloon1600x1600.png")
            .image("stock", "./assets/images/storage64x64.png")
            .image("production", "./assets/images/decreasing-bars64x64.png")
            .image("play", "./assets/images/playArrow300x200.png")
            .image("export", "./assets/images/export180x120.png")
            .image("title", "./assets/images/title.jpg")
            .image("banner", "./assets/images/banner.png")
            .image("startArrow", "./assets/images/StartArrow140x324.png")
            .svg("restart", "./assets/images/reload64x64.svg")
            .audio("background", "./assets/sounds/bgm.mp3")
            .audio("wind", "./assets/sounds/wind.mp3")
            .atlas(
                "shapes",
                "assets/particles/shapes.png",
                "./assets/particles/shapes.json"
            )
            .text(
                "wind-particle-effect",
                "./assets/particles/wind-particle-effect.json"
            );
    }

    private makeLoadingBar() {
        const loadingText = this.make.text({
            x: this.halfWidth,
            y: this.halfHeight - 50,
            text: "Loading...",
            style: {
                font: "30px Metamorphous",
                fill: Color.White,
            },
        });
        loadingText.setOrigin(0.5);

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(toHex(Color.DarkGrey), 0.8);
        progressBox.fillRect(
            this.halfWidth - 320 / 2,
            this.halfHeight,
            320,
            50
        );

        const assetText = this.make.text({
            x: this.halfWidth,
            y: this.halfHeight + 65,
            text: "",
            style: {
                font: "18px Metamorphous",
                fill: Color.White,
            },
        });
        assetText.setOrigin(0.5);

        this.load.on("progress", this.getProgressBarFiller(progressBar));
        this.load.on("fileprogress", this.getAssetTextWriter(assetText));
        this.load.on("complete", () => {
            this.scene.add("TitleScene", TitleScene, true);
            this.scene.remove("LoadingScene");
        });
    }

    private getAssetTextWriter(
        assetText: GameObjects.Text
    ): (file: { key: string }) => void {
        return (file: { key: string }) => {
            assetText.setText(`Loading asset: ${file.key}`);
        };
    }

    private getProgressBarFiller(
        progressBar: GameObjects.Graphics
    ): (count: number) => void {
        return (count: number) => {
            progressBar.clear();
            progressBar.fillStyle(toHex(Color.White));
            progressBar.fillRect(
                this.halfWidth + 10 - 320 / 2,
                this.halfHeight + 10,
                300 * count,
                30
            );
        };
    }

    private addTitles() {
        this.add
            .text(
                this.halfWidth,
                this.halfHeight - 200,
                "Der Fürsorger",
                TextConfig.title
            )
            .setOrigin(0.5);

        const subtitle = this.add
            .text(
                this.halfWidth,
                this.halfHeight - 120,
                "This world is dying. Can you save us?"
            )
            .setOrigin(0.5);
        setDefaultTextStyle(subtitle);
        subtitle.setColor(Color.White);
    }
}
