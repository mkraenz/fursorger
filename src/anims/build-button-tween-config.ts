import { GameObjects } from "phaser";
import { getBasicTweenConfig } from "./tween-base-config";

export const getBuildButtonTweenConfig = (target: GameObjects.Image) => ({
    ...getBasicTweenConfig(target),
    duration: 200,
});
