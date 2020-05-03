import { GameObjects, Scene } from "phaser";

export class Player extends GameObjects.Image {
    public id: string;

    constructor(scene: Scene, x: number, y: number, id: string) {
        super(scene, x, y, "plus");
        scene.add.existing(this);
        this.id = id;
    }
}
