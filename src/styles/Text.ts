import { GameObjects } from "phaser";
import { Color } from "./Color";

export const TextConfig = {
    lg: {
        font: "32px FellEnglishSC",
        fill: "#000000",
    },
    sm: {
        font: "16px FellEnglishSC",
        fill: "#000000",
    },
    debug: {
        fontFamily: "Courier",
        fontSize: "16px",
        color: "#00ff00",
    },
};

export const setDefaultTextStyle = (text: GameObjects.Text) =>
    text.setStyle(TextConfig.lg).setColor(Color.Black);
