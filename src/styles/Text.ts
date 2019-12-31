import { GameObjects } from "phaser";
import { Color } from "./Color";

export const TextConfig = {
    lg: {
        font: "32px Gothic",
        fill: "#000000",
    },
    sm: {
        font: "16px Gothic",
        fill: "#000000",
    },
    debug: {
        font: "16px Courier",
        fill: "#00ff00",
    },
};

export const setDefaultTextStyle = (text: GameObjects.Text) =>
    text.setStyle(TextConfig.lg).setColor(Color.Black);
