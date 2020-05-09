import { GameObjects } from "phaser";

export const setWhiteOutlineShadow = (text: GameObjects.Text) => {
    text.setStroke(text.style.color, 1.3);
    text.setAlpha(0.7);
    text.setShadow(0, 0, "#ffffffa0", 6, true, true);
};
