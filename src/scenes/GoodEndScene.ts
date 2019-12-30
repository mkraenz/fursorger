import { Scene } from "phaser";
import { gameConfig } from "../game-config";
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

    public preload(): void {
        this.load.image("goodEnd", "./assets/images/goodEnd1280×853.jpg");
    }

    public create(): void {
        this.add
            .image(0, 0, "goodEnd")
            .setOrigin(0)
            .setScale(
                (gameConfig.scale.width as number) / 1280,
                (gameConfig.scale.height as number) / 853
            );
    }
}
