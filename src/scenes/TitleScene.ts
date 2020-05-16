import { Scene } from "phaser";
import { BackgroundImage } from "../components/BackgroundImage";
import { BannerButton } from "../components/BannerButton";
import { Color } from "../styles/Color";
import { TextConfig } from "../styles/Text";
import { EditorScene } from "./editorScene";
import { MainScene } from "./mainScene";

export class TitleScene extends Scene {
    constructor() {
        super({
            key: "TitleScene",
        });
    }

    public create(): void {
        new BackgroundImage(this, "title");

        const title = this.add
            .text(this.scale.width / 2, 210, "Der Fürsorger", TextConfig.title)
            .setOrigin(0.5);
        title.setShadow(2, 2, Color.Black, 6, true, true);
        title.setAlpha(0.9);

        const bannerStartHeight = this.scale.height / 2 + 130;
        new BannerButton(this, bannerStartHeight, "Singleplayer", () =>
            this.startSinglePlayer()
        );
        new BannerButton(this, bannerStartHeight + 75, "Editor", () =>
            this.goto("EditorScene", EditorScene)
        );
        this.add
            .text(
                this.scale.width,
                this.scale.height - 10,
                "A Game by Mirco Kraenz and Matthias Möser",
                TextConfig.version
            )
            .setOrigin(1, 0.5);
        this.add.text(
            10,
            this.scale.height - 20,
            "v0.10.0",
            TextConfig.version
        );
    }

    public startSinglePlayer() {
        this.cameras.main.once("camerafadeoutcomplete", () => {
            this.goto("MainScene", MainScene);
        });
        this.cameras.main.fadeOut(800);
    }

    private goto(key: string, sceneClass: new (name: string) => Scene) {
        this.scene.add(key, sceneClass, true);
        this.scene.remove("TitleScene");
    }
}
