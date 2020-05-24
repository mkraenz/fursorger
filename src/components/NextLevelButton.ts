import { Scene } from "phaser";
import { MainSceneCfg } from "../styles/MainSceneCfg";
import { IconButton } from "./IconButton";

export const NextLevelButton = (
    scene: Scene,
    onPointerUp: () => void,
    x = MainSceneCfg.nextLevel.x,
    y = MainSceneCfg.nextLevel.y
) =>
    new IconButton(scene, onPointerUp, x, y, {
        baseScale: 0.6,
        texture: "arrow-right",
    });
