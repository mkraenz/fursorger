import { GameObjects, Scene } from "phaser";

export class Player extends GameObjects.Image {
    public id: string;

    constructor(scene: Scene, x: number, y: number, id: string) {
        super(scene, x, y, "plus");
        this.id = id;
    }

    public moveRight() {
        this.x += 10;
    }

    public moveLeft() {
        this.x -= 10;
    }

    public moveUp() {
        this.y -= 10;
    }
}