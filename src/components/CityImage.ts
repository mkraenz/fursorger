import { GameObjects, Scene } from "phaser";
import { GrowShrinkAnimPlugin } from "../anims/GrowShrinkAnimPlugin";

export enum CityImageState {
    Base,
    PlayerIsNeighboring,
    PlayerInCity,
}

export enum NodeName {
    City = "city",
    Shop = "shop",
}

export class CityImage extends GameObjects.Image {
    public state = CityImageState.Base;
    private growShrinkPlugin: GrowShrinkAnimPlugin;

    constructor(
        scene: Scene,
        x: number,
        y: number,
        nodeName: string,
        public name: string
    ) {
        super(scene, x, y, nodeName);
        scene.add.existing(this);
        this.setScale(0.18);

        this.growShrinkPlugin = new GrowShrinkAnimPlugin(scene, this, {
            speed: 0.5,
        });
        this.enterBaseState(true);
    }

    public nextState(state: CityImageState) {
        switch (state) {
            case CityImageState.Base:
                this.enterBaseState();
                break;
            case CityImageState.PlayerIsNeighboring:
                this.enterPlayerIsNeighboringState();
                break;
            case CityImageState.PlayerInCity:
                this.enterPlayerInCityState();
                break;
        }
    }

    public enterPlayerIsNeighboringState() {
        if (this.state === CityImageState.PlayerIsNeighboring) {
            return;
        }
        this.state = CityImageState.PlayerIsNeighboring;
        this.setInteractive();
        this.growShrinkPlugin.setEnabled();
    }

    public enterBaseState(init = false) {
        if (this.state === CityImageState.Base && !init) {
            return;
        }
        this.state = CityImageState.Base;
        this.disableInteractive();
        this.growShrinkPlugin.setDisabled();
    }

    public enterPlayerInCityState() {
        // not used yet
        this.enterBaseState();
    }
}
