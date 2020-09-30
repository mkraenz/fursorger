import { GameObjects, Scene } from "phaser";
import { Color } from "../styles/Color";
import { TextConfig } from "../styles/Text";

const cfg = {
    startY: 675,
    endY: 130,
    duration: 1800,
};

export class CreditsText extends GameObjects.Text {
    constructor(
        scene: Scene,
        text: string,
        isHeader?: boolean,
        onComplete?: () => void
    ) {
        super(
            scene,
            scene.scale.width / 2,
            cfg.startY,
            text,
            isHeader ? TextConfig.creditsHeader : TextConfig.credits
        );
        scene.add.existing(this);
        this.setOrigin(0.5);
        this.setAlpha(0.001);
        this.setShadow(0, 0, Color.Black, 4);

        // starts automatically
        scene.tweens.timeline({
            targets: this,
            duration: cfg.duration,
            tweens: [
                // convex combinations ftw!
                {
                    alpha: 1,
                    y: Math.floor((3 / 4) * cfg.startY + (1 / 4) * cfg.endY),
                },
                {
                    y: Math.floor((2 / 4) * cfg.startY + (2 / 4) * cfg.endY),
                },
                {
                    y: Math.floor((1 / 4) * cfg.startY + (3 / 4) * cfg.endY),
                },
                {
                    alpha: 0,
                    y: cfg.endY,
                },
            ],
            onComplete,
        });
    }
}
