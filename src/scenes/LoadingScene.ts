import { GameObjects, Scene } from "phaser";
import { DEV } from "../config";
import { setLevel } from "../registry/level";
import { Color, toHex } from "../styles/Color";
import { setDefaultTextStyle, TextConfig } from "../styles/Text";
import { MainScene } from "./mainScene";
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
        const imgPath = (filename: string) => `./assets/images/${filename}`;
        this.load
            .image(
                "rectangleButton",
                " ./assets/images/blank_rectangle60x160.png"
            )
            .image("goodEnd", imgPath("goodEnd1280×853.jpg"))
            .image("badEnd", imgPath("badEnd640x512.jpg"))
            .image("city", imgPath("town-01-inkarnate387x295.png"))
            .image("background", imgPath("shoaw-whium.jpg"))
            .image("backpack", imgPath("backpack64x64.png"))
            .image("hourglass", imgPath("hourglass64x64.png"))
            .image("background2", imgPath("default-background.jpg"))
            .image("map-tutorial", imgPath("map-tutorial-1.jpg"))
            .image("buildFactory", imgPath("buildFactoryButton128x128.png"))
            .image("balloon", imgPath("balloon1600x1600.png"))
            .image("stock", imgPath("storage64x64.png"))
            .image("production", imgPath("decreasing-bars64x64.png"))
            .image("play", imgPath("playArrow300x200.png"))
            .image("export", imgPath("export180x120.png"))
            .image("title", imgPath("title.jpg"))
            .image("banner", imgPath("banner.png"))
            .image("startArrow", imgPath("StartArrow140x324.png"))
            .svg("factory", imgPath("power-plant.svg"))
            .svg("restart", imgPath("reload64x64.svg"))
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
            )
            .spritesheet("octagon", imgPath("octagon.png"), {
                frameWidth: 128,
                frameHeight: 128,
                spacing: 100,
            })
            .spritesheet("plus", imgPath("plus-extra.png"), {
                frameWidth: 74,
                frameHeight: 74,
                spacing: 40,
            })
            .spritesheet("minus", imgPath("minus-extra.png"), {
                frameWidth: 74,
                frameHeight: 74,
                spacing: 40,
            });
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
            if (DEV.skipTitle) {
                this.scene.add("MainScene", MainScene, true);
            } else {
                this.scene.add("TitleScene", TitleScene, true);
            }
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
