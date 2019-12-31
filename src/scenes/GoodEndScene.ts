import { Scene } from "phaser";
import { gameConfig } from "../game-config";
import { MainScene } from "./mainScene";
const textStyle = {
    font: "48px Arial",
    fill: "#000000",
};
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
            this.scene.add("MainScene", MainScene, true);
            this.scene.remove(this);
        });
    }
}
