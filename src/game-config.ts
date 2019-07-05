import { Types } from "phaser";
import { MainScene } from "./scenes/mainScene";

export const gameConfig: Types.Core.GameConfig = {
    height: 600,
    parent: "game",
    scene: MainScene,
    type: Phaser.AUTO,
    width: 800,
};
