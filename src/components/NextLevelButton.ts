import { GameObjects, Scene } from "phaser";
import { GrowShrinkAnimPlugin } from "../anims/GrowShrinkAnimPlugin";
import { TextConfig } from "../styles/Text";

export class NextLevelButton extends GameObjects.Text {
    constructor(scene: Scene, onClick: () => void) {
        super(scene, 65, 520, "Next Level", TextConfig.lg);
        scene.add.existing(this);
        this.setInteractive();
        this.on("pointerup", () => onClick());
        new GrowShrinkAnimPlugin(scene, this, { maxRelativeScale: 1.2 });
    }
}
