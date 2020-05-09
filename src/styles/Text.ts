import { GameObjects } from "phaser";
import { Color } from "./Color";

export const TextConfig = {
    xl: {
        fontFamily: "FellEnglishSC",
        fontSize: "42px",
        color: "#000000",
    },
    lg: {
        fontFamily: "FellEnglishSC",
        fontSize: "32px",
        color: "#000000",
    },
    sm: {
        fontFamily: "FellEnglishSC",
        fontSize: "16px",
        color: "#000000",
    },
    debug: {
        fontFamily: "Courier",
        fontSize: "16px",
        color: "#00ff00",
    },
};

export const setDefaultTextStyle = (text: GameObjects.Text) =>
    text.setStyle(TextConfig.lg).setColor(Color.Black);
