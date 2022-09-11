import { GameObjects, Scene } from 'phaser';
import { ISecret } from '../levels/ILevel';
import { Color, toHex } from '../styles/Color';

export class Secret extends GameObjects.Rectangle {
    constructor(
        scene: Scene,
        { centerX, centerY, width, height, text }: ISecret
    ) {
        super(scene, centerX, centerY, width, height, toHex(Color.White), 0.1);
        scene.add.existing(this);
        this.setVisible(false);
        const storyText = scene.add.text(centerX - width, centerY, '');
        this.setInteractive();
        this.input.alwaysEnabled = true;
        this.on('pointerover', () => {
            this.setVisible(true);
        });
        this.on('pointerout', () => {
            this.setVisible(false);
            storyText.setText('');
        });
        this.on('pointerup', () => {
            storyText.setText(text);
        });
    }
}
