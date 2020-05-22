import { GameObjects, Scene } from "phaser";
import { GrowShrinkAnimPlugin } from "../anims/GrowShrinkAnimPlugin";

enum State {
    Base,
    Grown,
}

export class PlusMinusButton extends GameObjects.Sprite {
    private isClicked = false;
    private timeSincePointerdown = 0;
    private timeSinceLastCallback = 0;
    private hoverScalePlugin: GrowShrinkAnimPlugin;

    /**
     * @param onclickOrClickHold gets triggered on the initial pointer down and again with every few milliseconds passed
     */
    constructor(
        scene: Scene,
        texture: "plus" | "minus",
        private onclickOrClickHold: () => void,
        private disabledCondition: () => boolean
    ) {
        super(scene, -60, texture === "plus" ? -25 : 25, texture);
        scene.add.existing(this);
        this.setScale(0.5);
        this.setInputHandlers();
        this.setVisible(false);
        this.hoverScalePlugin = new GrowShrinkAnimPlugin(this.scene, this, {
            speed: 1.8,
        });
        this.configureAnims();

        this.setInteractive({ useHandCursor: true })
            .on("pointerdown", this.enterPressedState)
            .on("pointerup", this.enterUnpressedState);
        this.enterEnabledState();
        this.enterUnpressedState();
    }

    /**
     * phaser automagically calls any custom gameobject (added to the scene with `scene.add.existing(this)` )
     * that has a preUpdate method
     */
    public preUpdate(time: number, deltaTime: number) {
        if (this.disabledCondition()) {
            this.enterDisabledState();
        } else {
            this.enterEnabledState();
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

    private enterDisabledState() {
        this.disableInteractive();
        this.setAlpha(0.6);
        this.hoverScalePlugin.setDisabled();
        this.anims.play(`${this.texture.key}-unpressed`);
    }

    /**
     * pressed, hover, etc are substates of enabled
     */
    private enterEnabledState() {
        this.hoverScalePlugin.setEnabled();
        this.setAlpha(1);
        this.setInteractive();
    }

    private enterPressedState() {
        this.anims.play(`${this.texture.key}-pressed`);
    }

    private enterUnpressedState() {
        this.anims.play(`${this.texture.key}-unpressed`);
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

    private configureAnims() {
        this.configureAnim(`${this.texture.key}-unpressed`, 0);
        this.configureAnim(`${this.texture.key}-pressed`, 1);
    }

    private configureAnim(key: string, frame: number) {
        const cfg: Phaser.Types.Animations.Animation = {
            key,
            frames: this.scene.anims.generateFrameNumbers(this.texture.key, {
                start: frame,
                end: frame,
            }),
            frameRate: 1,
            repeat: -1,
        };
        this.scene.anims.create(cfg);
        this.anims.load(key);
    }
}
