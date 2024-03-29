import { GameObjects, Scene } from 'phaser';
import { TextConfig } from '../styles/Text';

/**
 * Prints the mouse coordinates on the canvas
 * Usage: Inside the scene, simply add `new DebugMouse(this)` to create()
 */
export class DebugMouse extends GameObjects.Text {
    constructor(scene: Scene) {
        super(scene, 10, 10, '', TextConfig.debug);
        scene.add.existing(this);
    }

    public preUpdate() {
        this.setText([
            `x: ${this.scene.input.activePointer.x}`,
            `y: ${this.scene.input.activePointer.y}`,
        ]);
    }
}
