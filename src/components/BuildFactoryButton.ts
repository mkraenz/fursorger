import { GameObjects, Scene, Tweens } from "phaser";
import { ScalableTweenBuilderConfig } from "../anims/ScalableTweenBuilderConfig";
import { MainSceneCfg } from "../styles/MainSceneCfg";

enum State {
    Disabled,
    Enabled,
}

export class BuildFactoryButton extends GameObjects.Image {
    public state = State.Disabled;
    private readonly baseScale = 0.5;
    private readonly anim: Tweens.Tween;

    constructor(scene: Scene, onPointerup: () => void) {
        super(
            scene,
            MainSceneCfg.buildFactory.x,
            MainSceneCfg.buildFactory.y,
            "buildFactory"
        );
        scene.add.existing(this);

        this.setScale(this.baseScale);
        this.anim = this.scene.add.tween(this.getTweenCfg());
        this.disable();
        this.on("pointerup", onPointerup);
    }

    public nextState(playerFactories: number) {
        if (playerFactories === 0) {
            this.disable();
        } else {
            this.enable();
        }
    }

    private disable() {
        this.state = State.Disabled;
        this.setAlpha(0.5).disableInteractive();
        this.anim.pause();
        this.setScale(this.baseScale);
    }

    private enable() {
        this.state = State.Enabled;
        this.clearAlpha().setInteractive();
        if (!this.anim.isPlaying()) {
            this.anim.restart();
            this.anim.resume(); // needed
        }
    }

    private getTweenCfg(): ScalableTweenBuilderConfig {
        return {
            targets: this,
            scaleX: this.baseScale * 1.4,
            scaleY: this.baseScale * 1.4,
            ease: "Linear",
            repeat: -1, // infinitely
            yoyo: true,
            duration: 200,
        };
    }
}
