import { GameObjects } from "phaser";
import { Color } from "./Color";

type Style = Partial<GameObjects.TextStyle>;

export const TextConfig: { [key: string]: Style } = {
    xl: {
        fontFamily: "Metamorphous",
        fontSize: "32px",
        color: "#000000",
    },
    lg: {
        fontFamily: "Metamorphous",
        fontSize: "20px",
        color: "#000000",
    },
    md: {
        fontFamily: "Metamorphous",
        fontSize: "16px",
        color: "#000000",
    },
    sm: {
        fontFamily: "Metamorphous",
        fontSize: "12px",
        color: "#000000",
    },
    debug: {
        fontFamily: "Courier",
        fontSize: "12px",
        color: "#00ff00",
    },
};

export const setDefaultTextStyle = (text: GameObjects.Text) =>
    text.setStyle(TextConfig.lg).setColor(Color.Black);
