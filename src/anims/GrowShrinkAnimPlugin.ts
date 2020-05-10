import { GameObjects, Scene, Tweens } from "phaser";
import { ScalableTweenBuilderConfig } from "./ScalableTweenBuilderConfig";

enum State {
    pointerover,
    pointerout,
}

/** Warning: Currently not working together with Containers. */
export class GrowShrinkAnimPlugin {
    public state = State.pointerout;
    private baseScale: number;
    private growAnim: Tweens.Tween;
    private shrinkAnim: Tweens.Tween;

    constructor(
        scene: Scene,
        private target: GameObjects.Image | GameObjects.Text,
        private maxScale = 1.25,
        private debug = false
    ) {
        this.baseScale = this.target.scale;
        this.growAnim = scene.add.tween(this.getTweenCfg("grow"));
        this.shrinkAnim = scene.add.tween(this.getTweenCfg("shrink"));
        this.target.on("pointerout", () => this.setPointerOutState());
        this.target.on("pointerover", () => this.setPointerOverState());
    }

    private setPointerOutState() {
        this.state = State.pointerout;
        this.growAnim.pause();
        this.shrinkAnim.restart();

        if (this.debug) {
            // tslint:disable-next-line: no-console
            console.log("pointerout");
        }
    }

    private setPointerOverState() {
        this.state = State.pointerover;
        this.shrinkAnim.pause();
        this.growAnim.restart();

        if (this.debug) {
            // tslint:disable-next-line: no-console
            console.log("pointerover");
        }
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
