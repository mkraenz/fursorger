import { Scene } from 'phaser';
import { BannerButton } from '../../components/BannerButton';
import { Color } from '../../styles/Color';
import { TextConfig } from '../../styles/Text';
import { EditorScene } from '../editorScene';

export class MainMenuScene extends Scene {
    constructor(key = 'MainMenuScene') {
        super(key);
    }

    public create() {
        const title = this.add
            .text(this.scale.width / 2, 210, 'Der Fürsorger', TextConfig.title)
            .setOrigin(0.5);
        title.setShadow(2, 2, Color.Black, 6, true, true);
        title.setAlpha(0.9);
        this.add
            .text(
                this.scale.width / 2,
                290,
                'A Game by Mirco Kraenz and Matthias Möser',
                TextConfig.subTitle
            )
            .setOrigin(0.5);
        this.add.text(
            10,
            this.scale.height - 20,
            'v0.42.0',
            TextConfig.version
        );

        const bannerStartHeight = this.scale.height / 2 + 55;
        new BannerButton(this, bannerStartHeight, 'Singleplayer', () =>
            this.switchWithinTitleScene('LevelSelectionScene')
        );
        new BannerButton(this, bannerStartHeight + 75, 'Editor', () =>
            this.goto('EditorScene', EditorScene)
        );
        new BannerButton(this, bannerStartHeight + 75 * 2, 'Credits', () =>
            this.switchWithinTitleScene('CreditsScene')
        );
    }

    private goto(key: string, sceneClass: new (name: string) => Scene) {
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.add(key, sceneClass, true);
        });
        this.cameras.main.fadeOut(800);
    }

    private switchWithinTitleScene(key: string) {
        this.scene.wake(key);
        this.scene.sleep();
    }
}
