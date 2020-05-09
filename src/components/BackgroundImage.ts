import { GameObjects, Scene } from "phaser";
import { gameConfig } from "../game-config";

export class BackgroundImage extends GameObjects.Image {
    constructor(scene: Scene, texture: string) {
        super(scene, 0, 0, texture);
        scene.add.existing(this);
        this.setOrigin(0);
        this.setDisplaySize(
            gameConfig.scale.width as number,
            gameConfig.scale.height as number
        );
    }
}
