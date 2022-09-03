import { Scene, Sound } from 'phaser';
import { BackgroundImage } from '../components/BackgroundImage';
import { BgmScene } from './BgmScene';
import { MainScene } from './mainScene';
import { CreditsScene } from './title/CreditsScene';
import { LevelSelectionScene } from './title/LevelSelectionScene';
import { MainMenuScene } from './title/MainMenuScene';

export interface ITitleSceneInitData {
    fadeInEnabled: boolean;
}

export class TitleScene extends Scene {
    private backgroundSound: Sound.BaseSound;
    private fadeInEnabled = true;

    constructor() {
        super({
            key: 'TitleScene',
        });
    }

    public init({ fadeInEnabled = true }: ITitleSceneInitData) {
        this.fadeInEnabled = fadeInEnabled;
    }

    public create(): void {
        if (this.fadeInEnabled) {
            this.cameras.main.fadeIn(200);
        }
        this.addMap();
        this.addHud();
    }

    private addHud() {
        const mainMenu = this.scene.add('MainMenuScene', MainMenuScene, true);
        const levelSelection = this.scene.add(
            'LevelSelectionScene',
            LevelSelectionScene,
            true
        );
        this.scene.sleep(levelSelection);

        const credits = this.scene.add('CreditsScene', CreditsScene, true);
        this.scene.sleep(credits);
    }

    private addMap() {
        this.backgroundSound = this.sound.add('risingMoon');
        this.backgroundSound.play({ loop: true, volume: 0 });
        this.tweens.add({
            targets: this.backgroundSound,
            volume: 0.15,
            duration: 400,
        });
        new BackgroundImage(this, 'title');
        this.add.particles(
            'shapes',
            new Function(
                `return ${this.cache.text.get('wind-particle-effect')}`
            )()
        );
    }

    public gotoMainScene() {
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.add('BgmScene', BgmScene, true);
            this.tweens.add({
                targets: this.backgroundSound,
                volume: 0,
                duration: 2000,
            });
            this.scene.add('MainScene', MainScene, true);
        });
        this.cameras.main.fadeOut(800);
    }
}
