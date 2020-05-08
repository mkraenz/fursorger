import { GameObjects, Scene, Tweens } from "phaser";
import { ScalableTweenBuilderConfig } from "../anims/ScalableTweenBuilderConfig";

enum State {
    base,
    grown,
}

export class PlusMinusButton extends GameObjects.Image {
    private isClicked = false;
    private timeSincePointerdown = 0;
    private timeSinceLastCallback = 0;
    private readonly baseScale = 0.5;
    private readonly growAnim: Tweens.Tween;
    private readonly shrinkAnim: Tweens.Tween;

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
        this.setInputHandlers();
        this.growAnim = this.scene.add.tween(this.getTweenCfg("grow"));
        this.shrinkAnim = this.scene.add.tween(this.getTweenCfg("shrink"));
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
        this.on("pointerover", () => {
            this.transitionToGrownState();
        });
        this.on("pointerout", () => {
            resetClicked();
            this.transitionToBaseState();
        });
    }

    private resetClicked() {
        this.isClicked = false;
        this.timeSincePointerdown = 0;
    }

    private transitionToGrownState() {
        this.state = State.grown;
        this.shrinkAnim.pause();
        this.growAnim.restart();
    }

    private transitionToBaseState() {
        this.state = State.base;
        this.growAnim.pause();
        this.shrinkAnim.restart();
    }

    private getTweenCfg(
        direction: "shrink" | "grow"
    ): ScalableTweenBuilderConfig {
        const targetScale =
            direction === "shrink" ? this.baseScale : this.baseScale * 1.4;
        return {
            targets: this,
            scaleX: targetScale,
            scaleY: targetScale,
            ease: "Linear",
            duration: 125,
        };
    }
}
