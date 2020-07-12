import { assign } from "lodash";
import { FOREVER, GameObjects, Scene, Tweens } from "phaser";
import { ScalableTweenBuilderConfig } from "../anims/ScalableTweenBuilderConfig";
import { MainSceneCfg } from "../styles/MainSceneCfg";

enum State {
    Disabled,
    Enabled,
}

const cfg = MainSceneCfg.buildFactory.img;

export class BuildFactoryButton extends GameObjects.Image {
    public state = State.Disabled;
    private readonly baseScale = 0.5;
    private readonly anim: Tweens.Tween;
    private readonly iconAnim: Tweens.Tween;
    private readonly icon: GameObjects.Image & { baseScale: number };

    constructor(
        scene: Scene,
        onPointerup: () => void,
        private disabledCondition: () => boolean
    ) {
        super(scene, cfg.x, cfg.y, "octagon");
        scene.add.existing(this);
        const icon = this.scene.add.image(cfg.x, cfg.y, "factory");
        this.icon = assign(icon, { baseScale: 1 });

        this.setScale(this.baseScale);
        this.anim = this.scene.add.tween(this.getTweenCfg());
        this.iconAnim = this.scene.add.tween(this.getIconTweenCfg());
        this.disable();
        this.iconAnim.resume();
        this.on("pointerup", onPointerup);
    }

    public preUpdate() {
        this.nextState();
    }

    private nextState() {
        if (this.disabledCondition()) {
            this.disable();
        } else {
            this.enable();
        }
    }

    private disable() {
        this.state = State.Disabled;
        this.setAlpha(0.5).disableInteractive();
        this.icon.setAlpha(0.3);
        this.anim.pause();
        this.iconAnim.pause();
        this.setScale(this.baseScale);
        this.icon.setScale(this.icon.baseScale);
    }

    private enable() {
        this.state = State.Enabled;
        this.clearAlpha().setInteractive();
        this.icon.clearAlpha();
        if (!this.anim.isPlaying()) {
            this.anim.restart();
            this.anim.resume(); // needed
            this.iconAnim.restart();
            this.iconAnim.resume(); // needed
        }
    }

    private getTweenCfg(): ScalableTweenBuilderConfig {
        return {
            targets: this,
            scaleX: this.baseScale * 1.2,
            scaleY: this.baseScale * 1.2,
            ease: "Linear",
            repeat: FOREVER,
            yoyo: true,
            duration: 300,
        };
    }

    private getIconTweenCfg(): ScalableTweenBuilderConfig {
        return {
            targets: this.icon,
            scaleX: this.icon.baseScale * 1.2,
            scaleY: this.icon.baseScale * 1.2,
            ease: "Linear",
            repeat: FOREVER,
            yoyo: true,
            duration: 300,
        };
    }
}
