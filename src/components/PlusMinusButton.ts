import { GameObjects, Scene } from "phaser";
import { getPlusMinusButtonTweenConfig } from "../anims/plus-minus-tween-config";

export class PlusMinusButton extends GameObjects.Image {
    private isClicked = false;
    private timeSincePointerdown = 0;
    private timeSinceLastCallback = 0;

    /**
     * @param onclickOrClickHold gets triggered on the initial pointer down and again with every few milliseconds passed
     */
    constructor(
        scene: Scene,
        texture: "plus" | "minus",
        private onclickOrClickHold: () => void
    ) {
        super(scene, -60, texture === "plus" ? -30 : 30, texture);
        scene.add.existing(this);
        this.setScale(0.5);
        this.setInteractive();

        const resetClicked = () => {
            this.isClicked = false;
            this.timeSincePointerdown = 0;
        };

        this.on("pointerdown", () => {
            this.isClicked = true;
            this.onclickOrClickHold();
        });
        this.on("pointerup", resetClicked);
        this.on("pointerover", () => {
            this.scene.tweens.add(getPlusMinusButtonTweenConfig(this));
        });
        this.on("pointerout", () => {
            resetClicked();
            this.scene.tweens.getTweensOf(this).forEach(tween => {
                tween.stop(0);
            });
        });
    }

    /**
     * phaser automagically calls any custom gameobject (added to the scene with `scene.add.existing(this)` )
     * that has a preUpdate method
     */
    public preUpdate(time: number, deltaTime: number) {
        if (this.isClicked) {
            this.timeSincePointerdown += deltaTime;
            this.timeSinceLastCallback += deltaTime;
            if (
                this.timeSincePointerdown > 500 &&
                this.timeSinceLastCallback > 100
            ) {
                this.onclickOrClickHold();
                this.timeSinceLastCallback = 0;
            }
        }
    }
}
