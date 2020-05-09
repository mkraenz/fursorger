import { Scene } from "phaser";
import { BackgroundImage } from "../components/BackgroundImage";
import { MainScene } from "./mainScene";

export class BadEndScene extends Scene {
    constructor() {
        super({
            key: "BadEndScene",
        });
    }

    public create(): void {
        const bg = new BackgroundImage(this, "badEnd");
        bg.setInteractive();
        bg.addListener("pointerup", () => {
            this.scene.add("MainScene", MainScene, true);
            this.scene.remove("BadEndScene");
        });
    }
}
