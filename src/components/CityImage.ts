import { GameObjects, Scene, Tweens } from "phaser";
import { ScalableTweenBuilderConfig } from "../anims/ScalableTweenBuilderConfig";

export enum CityImageState {
    Base,
    PlayerIsNeighboring,
    PlayerInCity,
}

export class CityImage extends GameObjects.Image {
    public state = CityImageState.Base;
    private readonly baseScale = 0.18;
    private readonly anim: Tweens.Tween;

    constructor(scene: Scene, x: number, y: number, public name: string) {
        super(scene, x, y, "city");
        scene.add.existing(this);

        this.anim = this.scene.add.tween(this.getTweenCfg());
        this.setStateBase(true);
    }

    public nextState(state: CityImageState) {
        switch (state) {
            case CityImageState.Base:
                this.setStateBase();
                break;
            case CityImageState.PlayerIsNeighboring:
                this.setStatePlayerIsNeighboring();
                break;
            case CityImageState.PlayerInCity:
                this.setStatePlayerInCity();
                break;
        }
    }

    public setStatePlayerIsNeighboring() {
        if (this.state === CityImageState.PlayerIsNeighboring) {
            return;
        }
        this.state = CityImageState.PlayerIsNeighboring;
        this.setInteractive();
        this.resetScale();
        if (!this.anim.isPlaying()) {
            this.anim.restart();
            this.anim.resume(); // needed
        }
    }

    public setStateBase(init = false) {
        if (this.state === CityImageState.Base && !init) {
            return;
        }
        this.state = CityImageState.Base;
        this.disableInteractive();
        this.anim.pause();
        this.resetScale();
    }

    public setStatePlayerInCity() {
        // not used yet
        this.setStateBase();
    }

    private resetScale() {
        this.setScale(this.baseScale);
    }

    private getTweenCfg(): ScalableTweenBuilderConfig {
        return {
            targets: this,
            scaleX: 0.3,
            scaleY: 0.3,
            duration: 800,
            ease: "Linear",
            repeat: -1, // infinitely
            yoyo: true,
        };
    }
}
