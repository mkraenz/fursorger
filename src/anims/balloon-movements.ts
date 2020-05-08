import { random } from "lodash";
import { GameObjects, Tweens } from "phaser";

export type CustomTween = Tweens.Tween & { movementPattern: number };

const balloonDisturbances = (
    t: number,
    x1: number,
    x2: number,
    disturbenceCase: number
) => {
    switch (disturbenceCase) {
        case 1: {
            return Math.floor(((t - x1) * (x2 - t)) / 1000);
        }
        case 2: {
            return Math.floor(
                40 * Math.sin((2 * Math.PI * (t - x1)) / (x2 - x1))
            );
        }
        case 3: {
            return Math.floor(
                40 * Math.sin((3 * Math.PI * (t - x1)) / (x2 - x1))
            );
        }
        case 4: {
            return Math.floor(
                40 * Math.sin((2 * Math.PI * (t - x1)) / (x2 - x1)) +
                    ((t - x1) * (x2 - t)) / 10000
            );
        }
        case 5: {
            return Math.floor(
                40 * Math.sin((3 * Math.PI * (t - x1)) / (x2 - x1)) +
                    ((t - x1) * (x2 - t)) / 5000
            );
        }
        // numberOfCases should be the highest possible case + 1
        default: {
            return Math.floor(((t - x1) * (x2 - t) * (x2 - t)) / 1000000);
        }
    }
};

export const numberOfCases = 6;

export function getBalloonTweenConfig(
    image: GameObjects.Image,
    start: { x: number; y: number },
    end: { x: number; y: number }
) {
    const MIN_BALLOON_SPEED = 0.4;
    const { x: x1, y: y1 } = start;
    const { x: x2, y: y2 } = end;

    if (Math.abs(x1 - x2) >= Math.abs(y1 - y2)) {
        return {
            targets: image,
            x: x2,
            ease: t => t,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            delay: Math.random() * 1000,
            hold: Math.random() * 1000,
            onUpdate() {
                image.y =
                    y1 +
                    Math.floor(
                        ((image.x - x1) * (y2 - y1)) / (x2 - x1) +
                            balloonDisturbances(
                                image.x,
                                x1,
                                x2,
                                (this as CustomTween).movementPattern
                            )
                    );
            },
            onYoyo() {
                this.setTimeScale(Math.max(Math.random(), MIN_BALLOON_SPEED));
                (this as CustomTween).movementPattern = random(numberOfCases);
            },
            onRepeat() {
                this.setTimeScale(Math.max(Math.random(), MIN_BALLOON_SPEED));
                (this as CustomTween).movementPattern = random(numberOfCases);
            },
        };
    } else {
        return {
            targets: image,
            y: y2,
            ease: t => t,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            delay: Math.random() * 1000,
            hold: Math.random() * 1000,
            onUpdate() {
                image.x =
                    x1 +
                    Math.floor(
                        ((image.y - y1) * (x2 - x1)) / (y2 - y1) +
                            balloonDisturbances(
                                image.y,
                                y1,
                                y2,
                                (this as CustomTween).movementPattern
                            )
                    );
            },
            onYoyo() {
                this.setTimeScale(Math.max(Math.random(), MIN_BALLOON_SPEED));
                (this as CustomTween).movementPattern = random(numberOfCases);
            },
            onRepeat() {
                this.setTimeScale(Math.max(Math.random(), MIN_BALLOON_SPEED));
                (this as CustomTween).movementPattern = random(numberOfCases);
            },
        };
    }
}
