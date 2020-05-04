import { GameObjects, Scene } from "phaser";
import { getPlusMinusButtonTweenConfig } from "../anims/plus-minus-tween-config";

export class PlusMinusButton extends GameObjects.Image {
    constructor(
        scene: Scene,
        texture: "plus" | "minus",
        onPointerup: () => void
    ) {
        super(scene, -60, texture === "plus" ? -30 : 30, texture);
        scene.add.existing(this);
        this.setScale(0.5);
        this.setInteractive();

        this.on("pointerup", onPointerup);
        this.on("pointerover", () => {
            this.scene.tweens.add(getPlusMinusButtonTweenConfig(this));
        });
        this.on("pointerout", () => {
            this.scene.tweens.getTweensOf(this).forEach(tween => {
                tween.stop(0);
            });
        });
    }
}
