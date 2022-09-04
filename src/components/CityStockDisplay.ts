import { GameObjects, Scene } from 'phaser';
import { setTextShadow } from '../styles/setTextShadow';
import { TextConfig } from '../styles/Text';

export class CityStockDisplay extends GameObjects.Text {
    constructor(scene: Scene, private dataSrc: () => number) {
        super(scene, -30, 25, '', TextConfig.lg);
        scene.add.existing(this);
        setTextShadow(this);
    }

    public preUpdate() {
        this.setText(`${this.dataSrc()}`);
    }
}
