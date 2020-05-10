import { GameObjects, Scene } from "phaser";
import { GrowShrinkAnimPlugin } from "../anims/GrowShrinkAnimPlugin";

enum State {
    Base,
    Grown,
}

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
        super(scene, -60, texture === "plus" ? -25 : 25, texture);
        scene.add.existing(this);
        this.setScale(0.5);
        this.setInteractive();
        this.setInputHandlers();
        this.setVisible(false);
        this.setAlpha(0.8);
        new GrowShrinkAnimPlugin(this.scene, this, 1.25, 1.8);
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

    private setInputHandlers() {
        const resetClicked = () => this.resetClicked();
        this.on("pointerdown", () => {
            this.isClicked = true;
            this.onclickOrClickHold();
        });
        this.on("pointerup", resetClicked);
        this.on("pointerout", resetClicked);
    }

    private resetClicked() {
        this.isClicked = false;
        this.timeSincePointerdown = 0;
    }
}
