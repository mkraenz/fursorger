import { GameObjects } from "phaser";

export const getBasicTweenConfig = (targets: GameObjects.Image) => ({
    targets,
    scaleX: targets.scaleX * 1.4,
    scaleY: targets.scaleY * 1.4,
    ease: "Linear",
    repeat: -1, // -1: infinity
    yoyo: true,
});
