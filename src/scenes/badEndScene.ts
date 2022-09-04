import { GameObjects, Scene } from 'phaser';
import { getLevel } from '../registry/level';
import { Color, toHex } from '../styles/Color';
import { TextConfig } from '../styles/Text';
import { MainScene } from './mainScene';

const TEXT_SPEED = 100; // 1 letter every 100 ms

export class BadEndScene extends Scene {
    constructor() {
        super({ key: 'BadEndScene' });
    }

    public create(): void {
        const bg = this.add
            .rectangle(
                0,
                0,
                this.scale.width,
                this.scale.height,
                toHex(Color.Black),
                0
            )
            .setOrigin(0, 0)
            .setInteractive();
        bg.on('pointerup', () => {
            this.restartMainScene();
            this.sound.stopByKey('scribbling');
        });

        this.fadeInAndThen(bg, () => this.scribble());
    }

    private fadeInAndThen(
        target: GameObjects.GameObject,
        onComplete: () => void
    ) {
        this.tweens.add({
            targets: [target],
            ease: 'linear',
            fillAlpha: 0.5,
            duration: 150,
            onComplete,
        });
    }

    private scribble() {
        const worldLostText = getWorldLostText(getLevel(this.registry));
        const fursorger = '— Der Fürsorger —';
        const halfWidth = this.scale.width / 2;
        const halfHeight = this.scale.height / 2;
        const worldLostTextComp = this.add
            .text(halfWidth, halfHeight - 80, '', TextConfig.xl)
            .setColor(Color.WhiteSilver)
            .setOrigin(0.5);
        this.sound.play('scribbling', { loop: true });
        typeWriter(worldLostText, worldLostTextComp, () =>
            this.events.emit('quote-scribbling-finished')
        );

        this.events.once('quote-scribbling-finished', () => {
            this.sound.stopByKey('scribbling');
            const fursorgerText = this.add
                .text(halfWidth, halfHeight - 40, fursorger, TextConfig.md)
                .setColor(Color.WhiteSilver)
                .setOrigin(0.5)
                .setAlpha(0);
            const goldenRatio = 0.618;
            const retryNote = this.add
                .text(
                    halfWidth,
                    this.scale.height * goldenRatio,
                    'Click anywhere to retry',
                    TextConfig.sm
                )
                .setColor(Color.WhiteSilver)
                .setOrigin(0.5)
                .setAlpha(0);
            this.fadeIn(fursorgerText);
            this.fadeIn(retryNote, 5000);
        });
    }

    private fadeIn(target: GameObjects.Text, startDelay?: number) {
        this.tweens.add({
            targets: [target],
            ease: 'Cubic',
            delay: startDelay,
            alpha: 1,
            duration: 1500,
        });
    }

    private restartMainScene() {
        const mainScene = this.scene.get('MainScene') as MainScene;
        mainScene.restart();
        this.scene.remove(this);
    }
}

const getWorldLostText = (level: number) => {
    switch (level) {
        case 0:
            return 'One world lost.';
        case 1:
            return 'Another world lost.';
        case 2:
        case 3:
            return 'I will never let something like back then happen again.';
        case 4:
            return 'Yet another world lost.';
        case 5:
        case 6:
            return 'Yet another world lost...';
        case 7:
        case 8:
            return "I'm tired...";
        default:
            return 'Is there no end to misery?';
    }
};

const withQuotes = (s: string) => `"${s}"`;

const typeWriter = (
    fullText: string,
    textComponent: GameObjects.Text,
    onFinish: () => void,
    lastLetter = 0,
    currentText = ''
) => {
    if (lastLetter < fullText.length) {
        const nextText = `${currentText}${fullText.charAt(lastLetter)}`;
        textComponent.setText(withQuotes(nextText));
        setTimeout(
            () =>
                typeWriter(
                    fullText,
                    textComponent,
                    onFinish,
                    lastLetter + 1,
                    nextText
                ),
            TEXT_SPEED
        );
    } else {
        onFinish();
    }
};
