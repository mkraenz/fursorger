import { Types } from "phaser";
import { MainScene } from "./scenes/mainScene";

export const gameConfig: Types.Core.GameConfig = {
    scene: MainScene,
    type: Phaser.AUTO,
    dom: {
        createContainer: true,
    },
    scale: {
        parent: "game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
};
