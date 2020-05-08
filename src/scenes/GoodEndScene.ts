import { Scene } from "phaser";
import { BackgroundImage } from "../components/BackgroundImage";
import { levels } from "../levels";
import { getLevel, setLevel } from "../registry/level";
import { MainScene } from "./mainScene";

export class GoodEndScene extends Scene {
    constructor() {
        super({
            key: "GoodEndScene",
        });
    }

    public create(): void {
        const bg = new BackgroundImage(this, "goodEnd");
        bg.setInteractive();
        bg.addListener("pointerup", () => {
            setLevel(
                this.registry,
                (getLevel(this.registry) + 1) % levels.length
            );
            this.scene.add("MainScene", MainScene, true);
            this.scene.remove("GoodEndScene");
        });
    }
}
