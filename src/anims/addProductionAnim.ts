import { GameObjects, Scene } from "phaser";
import { Color } from "../styles/Color";
import { TextConfig } from "../styles/Text";

export const addProductionAnim = (
    scene: Scene,
    parent: GameObjects.Container
) => {
    const production = Number((parent.getAt(2) as GameObjects.Text).text);
    if (production === 0) {
        return;
    }

    const productionAnim = scene.add.text(
        // TODO move to stock position
        parent.x - 40,
        parent.y + 40,
        production.toString(),
        {
            ...TextConfig.lg,
        }
    );
    setProductionTextColor(production, productionAnim);
    scene.tweens.add({
        targets: productionAnim,
        y: parent.y + 100,
        alpha: 0,
        duration: 900,
        onComplete: tween => {
            tween.remove();
            productionAnim.destroy();
        },
    });
};

export const setProductionTextColor = (
    production: number,
    text: GameObjects.Text
) => {
    if (production < 0) {
        text.setColor(Color.Red);
    }
    if (production > 0) {
        text.setColor(Color.Green);
    }
    if (production === 0) {
        text.setColor(Color.Black);
    }
};
