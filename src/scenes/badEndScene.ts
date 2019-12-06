import { Scene } from "phaser";
import { gameConfig } from "../game-config";

export class BadEndScene extends Scene {
    constructor() {
        super({
            key: "BadEndScene",
        });
    }

    public preload(): void {
        this.load.image("badEnd", "./assets/images/badEnd640x512.jpg");
    }

    public create(): void {
        this.add
            .image(0, 0, "badEnd")
            .setOrigin(0)
            .setScale(
                (gameConfig.width as number) / 640,
                (gameConfig.height as number) / 512
            );
    }
}
