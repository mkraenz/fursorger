import { random } from "lodash";
import { GameObjects, Tweens } from "phaser";

const TWEEN_AFTERIMAGE_STEPS = 10;
export type CustomTween = Tweens.Tween & { movementPattern: number } & {
    startDelay: number;
    frontTween?: CustomTween;
    // counter should be between 1 and TWEEN_AFTERIMAGE_STEP - 1
    // TODO: better name than "counter"
    counter: number;
};

export const markedPoints = [];

function isTimeToMark(x: number, x1: number, x2: number, counter: number) {
    if (counter < TWEEN_AFTERIMAGE_STEPS) {
        return (
            Math.abs(x - x1) >
            (Math.abs(x2 - x1) / TWEEN_AFTERIMAGE_STEPS) * counter
        );
    } else {
        return (
            Math.abs(x - x1) <
            (Math.abs(x2 - x1) / TWEEN_AFTERIMAGE_STEPS) *
                (2 * TWEEN_AFTERIMAGE_STEPS - counter)
        );
    }
}

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
    x1: number,
    x2: number,
    y1: number,
    y2: number,
    startDelay: number
) {
    const MIN_BALLOON_SPEED = 0.4;
    const MAX_BALLOON_SPEED = 0.6;

    if (Math.abs(x1 - x2) >= Math.abs(y1 - y2)) {
        return {
            targets: image,
            x: x2,
            ease: t => t,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            delay: startDelay,
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

                if (
                    (this as CustomTween).frontTween === undefined &&
                    isTimeToMark(image.x, x1, x2, (this as CustomTween).counter)
                ) {
                    markedPoints.push({ x: image.x, y: image.y });
                    (this as CustomTween).counter += 1;
                }
            },
            onYoyo() {
                if ((this as CustomTween).frontTween === undefined) {
                    this.setTimeScale(
                        Math.min(
                            Math.max(Math.random(), MIN_BALLOON_SPEED),
                            MAX_BALLOON_SPEED
                        )
                    );
                    (this as CustomTween).movementPattern = random(
                        numberOfCases
                    );
                } else {
                    this.setTimeScale(
                        (this as CustomTween).frontTween.timeScale
                    );
                    (this as CustomTween).movementPattern = (this as CustomTween).frontTween.movementPattern;
                }
            },
            onRepeat() {
                if ((this as CustomTween).frontTween === undefined) {
                    this.setTimeScale(
                        Math.min(
                            Math.max(Math.random(), MIN_BALLOON_SPEED),
                            MAX_BALLOON_SPEED
                        )
                    );
                    (this as CustomTween).movementPattern = random(
                        numberOfCases
                    );
                    (this as CustomTween).counter = 1;
                } else {
                    this.setTimeScale(
                        (this as CustomTween).frontTween.timeScale
                    );
                    (this as CustomTween).movementPattern = (this as CustomTween).frontTween.movementPattern;
                }
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
            delay: startDelay,
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
                if ((this as CustomTween).frontTween === undefined) {
                    this.setTimeScale(
                        Math.min(
                            Math.max(Math.random(), MIN_BALLOON_SPEED),
                            MAX_BALLOON_SPEED
                        )
                    );
                    (this as CustomTween).movementPattern = random(
                        numberOfCases
                    );
                } else {
                    this.setTimeScale(
                        (this as CustomTween).frontTween.timeScale
                    );
                    (this as CustomTween).movementPattern = (this as CustomTween).frontTween.movementPattern;
                }
            },
            onRepeat() {
                if ((this as CustomTween).frontTween === undefined) {
                    this.setTimeScale(
                        Math.min(
                            Math.max(Math.random(), MIN_BALLOON_SPEED),
                            MAX_BALLOON_SPEED
                        )
                    );
                    (this as CustomTween).movementPattern = random(
                        numberOfCases
                    );
                } else {
                    this.setTimeScale(
                        (this as CustomTween).frontTween.timeScale
                    );
                    (this as CustomTween).movementPattern = (this as CustomTween).frontTween.movementPattern;
                }
            },
        };
    }
}
