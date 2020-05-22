import { Scene } from "phaser";
import { MainSceneCfg } from "../styles/MainSceneCfg";
import { IconButton } from "./IconButton";

export const RestartButton = (scene: Scene, onPointerUp: () => void) =>
    new IconButton(
        scene,
        onPointerUp,
        MainSceneCfg.restart.x,
        MainSceneCfg.restart.y,
        { baseScale: 0.6, texture: "restart" }
    );
