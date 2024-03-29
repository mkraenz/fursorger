import { GameObjects, Scene } from 'phaser';
import { MainSceneCfg as Cfg } from '../styles/MainSceneCfg';
import { setTextShadow } from '../styles/setTextShadow';
import { TextConfig } from '../styles/Text';

export class TurnDisplay extends GameObjects.Text {
    constructor(scene: Scene, private dataSrc: () => number) {
        super(
            scene,
            Cfg.turnInfo.text.x,
            Cfg.turnInfo.text.y,
            '',
            TextConfig.xl
        );
        scene.add.existing(this);
        scene.add
            .image(Cfg.turnInfo.img.x, Cfg.turnInfo.img.y, 'hourglass')
            .setScale(0.8);
        setTextShadow(this);
    }

    public preUpdate() {
        this.setText(`${this.dataSrc()}`);
    }
}
