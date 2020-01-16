import { GameObjects } from "phaser";
import { getBasicTweenConfig } from "./tween-base-config";

export const getTweenConfig = (target: GameObjects.Image) => ({
    ...getBasicTweenConfig(target),
    scaleX: 0.3,
    scaleY: 0.3,
    duration: 800,
});
