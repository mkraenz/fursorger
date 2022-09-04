import { GameObjects, Scene } from 'phaser';
import { setTextShadow } from '../styles/setTextShadow';
import { TextConfig } from '../styles/Text';

export class NameDisplay extends GameObjects.Text {
    constructor(scene: Scene, name: string) {
        super(scene, -40, -45, name, TextConfig.md);
        scene.add.existing(this);
        setTextShadow(this);
    }
}
