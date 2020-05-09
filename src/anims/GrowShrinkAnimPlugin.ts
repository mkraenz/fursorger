import { GameObjects, Scene, Tweens } from "phaser";
import { ScalableTweenBuilderConfig } from "./ScalableTweenBuilderConfig";

enum State {
    pointerOver,
    pointerOut,
}

/** Warning: not working together with Containers. */
export class GrowShrinkAnimPlugin extends GameObjects.Rectangle {
    public state = State.pointerOut;
    private baseScale: number;
    private growAnim: Tweens.Tween;
    private shrinkAnim: Tweens.Tween;

    constructor(
        scene: Scene,
        private target: GameObjects.Image | GameObjects.Text,
        private maxScale = 1.25
    ) {
        super(scene, target.x, target.y, target.width, target.height);
        this.baseScale = this.target.scale;
        this.setOrigin(target.originX, target.originY);
        scene.add.existing(this);
        this.growAnim = scene.add.tween(this.getTweenCfg("grow"));
        this.shrinkAnim = scene.add.tween(this.getTweenCfg("shrink"));
        this.setInteractive();
        this.setDepth(999999);

        this.propogateEvents();
        this.on("pointerout", () => this.setPointerOutState());
        this.on("pointerover", () => this.setPointerOverState());
    }

    /**
     *  needed because phaser sends input events only to the top-most game object (set via setDepth())
     *  This is likely to cause bugs in the future.
     *  Alternative might be to use scene.input.activePointer.x or sth like that
     */
    private propogateEvents() {
        this.target.eventNames().forEach(event => {
            this.target.listeners(event).forEach(listener =>
                this.on(event, () => {
                    listener();
                })
            );
        });
    }

    private setPointerOutState() {
        this.state = State.pointerOut;
        this.growAnim.pause();
        this.shrinkAnim.restart();
    }

    private setPointerOverState() {
        this.state = State.pointerOver;
        this.shrinkAnim.pause();
        this.growAnim.restart();
    }

    private getTweenCfg(
        direction: "shrink" | "grow"
    ): ScalableTweenBuilderConfig {
        const targetScale =
            direction === "shrink"
                ? this.baseScale
                : this.baseScale * this.maxScale;
        return {
            targets: this.target,
            scaleX: targetScale,
            scaleY: targetScale,
            ease: "Linear",
            duration: 100,
        };
    }
}
