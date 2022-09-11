import { debounce } from 'lodash';
import { GameObjects, Scene } from 'phaser';
import { Color } from '../styles/Color';
import { TextConfig } from '../styles/Text';

const CLICK_COOLDOWN = 1000;

export class BannerButton extends GameObjects.Sprite {
    private buttonText!: GameObjects.Text;

    constructor(
        scene: Scene,
        y: number,
        text: string,
        onPointerup: () => void
    ) {
        super(scene, scene.scale.width / 2, y, 'banner');
        scene.add.existing(this);
        this.setDisplaySize(300, 300 / 6);

        this.setInteractive({ useHandCursor: true });
        this.on(
            'pointerup',
            debounce(onPointerup, CLICK_COOLDOWN, { leading: true })
        )
            .on('pointerover', this.enterHoverState)
            .on('pointerout', this.enterBaseState);

        this.addText(scene, scene.scale.width / 2, y, text);
        this.enterBaseState();
    }

    private addText(scene: Scene, halfWidth: number, y: number, text: string) {
        this.buttonText = scene.add
            .text(halfWidth, y, text, TextConfig.banner)
            .setOrigin(0.5);
        this.buttonText.setStroke(this.buttonText.style.color, 1.3);
        this.buttonText.setShadow(2, 2, Color.Black, 6, true, true);
    }

    private enterHoverState() {
        this.buttonText.setAlpha(1);
    }

    private enterBaseState() {
        this.buttonText.setAlpha(0.7);
    }
}
