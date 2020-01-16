import { Scene } from "phaser";
import { gameConfig } from "../game-config";
import { MainScene } from "./mainScene";

export class BadEndScene extends Scene {
    constructor() {
        super({
            key: "BadEndScene",
        });
    }

    public create(): void {
        const bg = this.add
            .image(0, 0, "badEnd")
            .setOrigin(0)
            .setScale(
                (gameConfig.scale.width as number) / 640,
                (gameConfig.scale.height as number) / 512
            )
            .setInteractive();
        bg.addListener("pointerup", () => {
            this.scene.add("MainScene", MainScene, true);
            this.scene.remove(this);
        });
    }
}
