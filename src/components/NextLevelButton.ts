import { Scene } from "phaser";
import { MainSceneCfg } from "../styles/MainSceneCfg";
import { IconButton } from "./IconButton";

export const NextLevelButton = (scene: Scene, onPointerUp: () => void) =>
    new IconButton(
        scene,
        onPointerUp,
        MainSceneCfg.nextLevel.x,
        MainSceneCfg.nextLevel.y,
        {
            baseScale: 0.6,
            texture: "arrow-right",
        }
    );
