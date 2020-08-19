import { Scene, Sound } from "phaser";
import { BackgroundImage } from "../components/BackgroundImage";
import { BannerButton } from "../components/BannerButton";
import { Color } from "../styles/Color";
import { TextConfig } from "../styles/Text";
import { BgmScene } from "./BgmScene";
import { CreditsScene } from "./CreditsScene";
import { EditorScene } from "./editorScene";
import { MainScene } from "./mainScene";

export interface ITitleSceneInitData {
    fadeInEnabled: boolean;
}

export class TitleScene extends Scene {
    private backgroundSound: Sound.BaseSound;
    private fadeInEnabled = true;

    constructor() {
        super({
            key: "TitleScene",
        });
    }

    public init({ fadeInEnabled = true }: ITitleSceneInitData) {
        this.fadeInEnabled = fadeInEnabled;
    }

    public create(): void {
        if (this.fadeInEnabled) {
            this.cameras.main.fadeIn(200);
        }
        this.addMap();
        this.addHud();
    }

    private addHud() {
        const title = this.add
            .text(this.scale.width / 2, 210, "Der Fürsorger", TextConfig.title)
            .setOrigin(0.5);
        title.setShadow(2, 2, Color.Black, 6, true, true);
        title.setAlpha(0.9);
        this.add
            .text(
                this.scale.width / 2,
                290,
                "A Game by Mirco Kraenz and Matthias Möser",
                TextConfig.subTitle
            )
            .setOrigin(0.5);
        this.add.text(
            10,
            this.scale.height - 20,
            "v0.42.0",
            TextConfig.version
        );

        const bannerStartHeight = this.scale.height / 2 + 55;
        new BannerButton(this, bannerStartHeight, "Singleplayer", () =>
            this.goto("MainScene", MainScene)
        );
        new BannerButton(this, bannerStartHeight + 75, "Editor", () =>
            this.goto("EditorScene", EditorScene)
        );
        new BannerButton(this, bannerStartHeight + 75 * 2, "Credits", () =>
            this.goto("CreditsScene", CreditsScene)
        );
    }

    private addMap() {
        this.backgroundSound = this.sound.add("risingMoon");
        this.backgroundSound.play("", { loop: true, volume: 0 });
        this.tweens.add({
            targets: this.backgroundSound,
            volume: 0.15,
            duration: 400,
        });
        new BackgroundImage(this, "title");
        this.add.particles(
            "shapes",
            new Function(
                `return ${this.cache.text.get("wind-particle-effect")}`
            )()
        );
    }

    private goto(key: string, sceneClass: new (name: string) => Scene) {
        if (key === "CreditsScene") {
            this.scene.add(key, sceneClass, true);
        } else {
            this.cameras.main.once("camerafadeoutcomplete", () => {
                this.scene.add("BgmScene", BgmScene, true);
                this.tweens.add({
                    targets: this.backgroundSound,
                    volume: 0,
                    duration: 2000,
                    onComplete: () => this.scene.remove(this),
                });
                this.scene.add(key, sceneClass, true);
            });
            this.cameras.main.fadeOut(800);
        }
    }
}
