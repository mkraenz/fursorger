import { GameObjects, Scene } from "phaser";
import { CityImage, CityImageState } from "./CityImage";
import { PlusMinusButton } from "./PlusMinusButton";

export enum CityState {
    Base,
    PlayerIsNeighboring,
    PlayerInCity,
}

export class City extends GameObjects.Container {
    public state = CityState.Base;

    constructor(
        scene: Scene,
        x: number,
        y: number,
        name: string,
        children: {
            citySprite: CityImage;
            stockText: GameObjects.Text;
            productionText: GameObjects.Text;
            plusTradeButton: PlusMinusButton;
            minusTradeButton: PlusMinusButton;
        }
    ) {
        super(scene, x, y, [
            children.citySprite,
            children.stockText,
            children.productionText,
            children.plusTradeButton,
            children.minusTradeButton,
        ]);
        scene.add.existing(this);
        this.setDepth(1); // balloons below city
        this.setName(name);
    }

    get citySprite() {
        return this.getAt(0) as CityImage;
    }

    get stockText() {
        return this.getAt(1) as GameObjects.Text;
    }

    get productionText() {
        return this.getAt(2) as GameObjects.Text;
    }

    get plusTradeButton() {
        return this.getAt(3) as PlusMinusButton;
    }

    get minusTradeButton() {
        return this.getAt(4) as PlusMinusButton;
    }

    public nextState(state: CityState) {
        switch (state) {
            case CityState.Base:
                this.setStateBase();
                break;
            case CityState.PlayerIsNeighboring:
                this.setStatePlayerIsNeighboring();
                break;
            case CityState.PlayerInCity:
                this.setStatePlayerInCity();
                break;
        }
    }

    public setStatePlayerIsNeighboring() {
        if (this.state === CityState.PlayerIsNeighboring) {
            return;
        }
        this.state = CityState.PlayerIsNeighboring;
        this.citySprite.nextState(CityImageState.PlayerIsNeighboring);
        this.setTradeButtonVisible(false);
    }

    public setStateBase() {
        if (this.state === CityState.Base) {
            return;
        }
        this.state = CityState.Base;
        this.citySprite.nextState(CityImageState.Base);
        this.setTradeButtonVisible(false);
    }

    public setStatePlayerInCity() {
        if (this.state === CityState.PlayerInCity) {
            return;
        }
        this.state = CityState.PlayerInCity;
        this.citySprite.nextState(CityImageState.PlayerInCity);
        this.setTradeButtonVisible(true);
    }

    private setTradeButtonVisible(value: boolean) {
        this.plusTradeButton.setVisible(value);
        this.minusTradeButton.setVisible(value);
    }
}
