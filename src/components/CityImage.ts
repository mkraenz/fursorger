import { GameObjects, Scene } from "phaser";
import { GrowShrinkAnimPlugin } from "../anims/GrowShrinkAnimPlugin";

export enum CityImageState {
    Base,
    PlayerIsNeighboring,
    PlayerInCity,
}

export class CityImage extends GameObjects.Image {
    public state = CityImageState.Base;
    private growShrinkPlugin: GrowShrinkAnimPlugin;

    constructor(scene: Scene, x: number, y: number, public name: string) {
        super(scene, x, y, "city");
        scene.add.existing(this);
        this.setScale(0.18);

        this.growShrinkPlugin = new GrowShrinkAnimPlugin(scene, this, {
            speed: 0.5,
        });
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
        this.growShrinkPlugin.setEnabled();
    }

    public setStateBase(init = false) {
        if (this.state === CityImageState.Base && !init) {
            return;
        }
        this.state = CityImageState.Base;
        this.disableInteractive();
        this.growShrinkPlugin.setDisabled();
    }

    public setStatePlayerInCity() {
        // not used yet
        this.setStateBase();
    }
}
