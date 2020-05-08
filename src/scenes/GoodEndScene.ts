import { Scene } from "phaser";
import { gameConfig } from "../game-config";
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
        const bg = this.add
            .image(0, 0, "goodEnd")
            .setOrigin(0)
            .setScale(
                (gameConfig.scale.width as number) / 1280,
                (gameConfig.scale.height as number) / 853
            )
            .setInteractive();
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
