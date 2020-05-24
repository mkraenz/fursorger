import { GameObjects, Scene } from "phaser";
import { BackgroundImage } from "../components/BackgroundImage";
import { NextLevelButton } from "../components/NextLevelButton";
import { RestartButton } from "../components/RestartButton";
import { levels } from "../levels";
import { getLevel, setLevel } from "../registry/level";
import { Color } from "../styles/Color";
import { TextConfig } from "../styles/Text";
import { MainScene } from "./mainScene";

const TEXT_SPEED = 100; // 1 letter every 100 ms

export class GoodEndScene extends Scene {
    private turns = 9999;

    constructor() {
        super({ key: "GoodEndScene" });
    }

    public init(data: { turns: number }) {
        this.turns = data.turns;
    }

    public create(): void {
        new BackgroundImage(this, "goodEnd").setAlpha(0.2);
        const worldSavedText = getWorldSavedText(getLevel(this.registry));
        const fursorger = "— Der Fürsorger —";
        const turns = `Turns: ${this.turns || "unknown"}`;
        const halfWidth = this.scale.width / 2;
        const halfHeight = this.scale.height / 2;
        const buttonHeight = halfHeight + 100;
        const worldSavedTextComp = this.add
            .text(halfWidth, halfHeight - 150, "", TextConfig.xl)
            .setColor(Color.WhiteSilver)
            .setOrigin(0.5);
        this.sound.play("scribbling", { loop: true });
        typeWriter(worldSavedText, worldSavedTextComp, () =>
            this.events.emit("quote-scribbling-finished")
        );

        this.events.once("quote-scribbling-finished", () => {
            this.sound.stopByKey("scribbling");
            const fursorgerText = this.add
                .text(halfWidth, halfHeight - 100, fursorger, TextConfig.md)
                .setColor(Color.WhiteSilver)
                .setOrigin(0.5)
                .setAlpha(0);
            const turnsText = this.add
                .text(halfWidth, halfHeight, turns, TextConfig.lg)
                .setColor(Color.WhiteSilver)
                .setOrigin(0.5)
                .setAlpha(0);
            const xCenterOffset = 125;
            const restartButton = RestartButton(
                this,
                () => this.startMainScene(false),
                halfWidth - xCenterOffset,
                buttonHeight
            ).setAlpha(0);
            const nextLevelButton = NextLevelButton(
                this,
                () => this.startMainScene(true),
                halfWidth + xCenterOffset,
                buttonHeight
            ).setAlpha(0);

            this.tweens.add({
                targets: [
                    fursorgerText,
                    turnsText,
                    restartButton,
                    nextLevelButton,
                ],
                ease: "Cubic",
                alpha: 1,
                duration: 1500,
            });
        });
    }

    private startMainScene(nextLevel: boolean) {
        if (nextLevel) {
            setLevel(
                this.registry,
                (getLevel(this.registry) + 1) % levels.length
            );
        }
        this.scene.add("MainScene", MainScene, true);
        this.scene.remove(this);
    }
}

const getWorldSavedText = (level: number) => {
    if (level === 0) {
        return "One world saved.";
    }
    if (level <= 2) {
        return "Another world saved.";
    }
    if (level <= 4) {
        return "Yet another world saved.";
    }
    if (level <= 6) {
        return "Yet another world saved...";
    }
    if (level <= 8) {
        return "I'm tired...";
    } else {
        return "Is there no end to misery?";
    }
};

const withQuotes = (s: string) => `"${s}"`;

const typeWriter = (
    fullText: string,
    textComponent: GameObjects.Text,
    onFinish: () => void,
    lastLetter = 0,
    currentText = ""
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
