import { Scene } from 'phaser';
import { BannerButton } from '../../components/BannerButton';
import { levels } from '../../levels';
import { setLevel } from '../../registry/level';
import { Color } from '../../styles/Color';
import { TextConfig } from '../../styles/Text';
import { TitleScene } from '../TitleScene';

export class LevelSelectionScene extends Scene {
    constructor(key = 'LevelSelectionScene') {
        super(key);
    }

    public create() {
        const title = this.add
            .text(this.scale.width / 2, 210, 'Select Level', TextConfig.title)
            .setOrigin(0.5);
        title.setShadow(2, 2, Color.Black, 6, true, true);
        title.setAlpha(0.9);

        levels.forEach((level, index) => {
            const text = this.add
                .text(
                    this.scale.width / 2,
                    this.scale.height / 3 + 40 + index * 32,
                    level.name,
                    TextConfig.levelSelectItem
                )
                .setOrigin(0.5)
                .setAlpha(0.7);
            text.setInteractive({ useHandCursor: true });
            text.once('pointerup', () => {
                setLevel(this.registry, index);
                this.gotoMainScene();
            });
            text.on('pointerover', () => text.setAlpha(1)).on(
                'pointerout',
                () => text.setAlpha(0.7)
            );
        });

        new BannerButton(this, this.scale.height / 2 + 230, 'Back', () => {
            this.scene.wake('MainMenuScene');
            this.scene.sleep();
        });
    }

    private gotoMainScene() {
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.pause();
        });
        this.cameras.main.fadeOut(800);
        const titleScene = this.scene.get('TitleScene');
        (titleScene as TitleScene).gotoMainScene();
    }
}
