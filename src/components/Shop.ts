import { GameObjects, Scene } from 'phaser';
import { CityState } from './City';
import { CityImage, CityImageState } from './CityImage';
import { NameDisplay } from './NameDisplay';
import { PlusMinusButton } from './PlusMinusButton';

export class Shop extends GameObjects.Container {
    public state = CityState.Base;

    constructor(
        scene: Scene,
        x: number,
        y: number,
        name: string,
        children: {
            sprite: CityImage;
            nameText: NameDisplay;
            buyButton: PlusMinusButton;
        }
    ) {
        super(scene, x, y, [
            children.sprite,
            children.nameText,
            children.buyButton,
        ]);
        scene.add.existing(this);
        this.setDepth(1); // balloons below city
        this.setName(name);
    }

    get sprite() {
        return this.getAt(0) as CityImage;
    }

    get nameText() {
        return this.getAt(1) as NameDisplay;
    }

    get plusTradeButton() {
        return this.getAt(2) as PlusMinusButton;
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
        this.sprite.nextState(CityImageState.PlayerIsNeighboring);
        this.setTradeButtonVisible(false);
    }

    public setStateBase() {
        if (this.state === CityState.Base) {
            return;
        }
        this.state = CityState.Base;
        this.sprite.nextState(CityImageState.Base);
        this.setTradeButtonVisible(false);
    }

    public setStatePlayerInCity() {
        if (this.state === CityState.PlayerInCity) {
            return;
        }
        this.state = CityState.PlayerInCity;
        this.sprite.nextState(CityImageState.PlayerInCity);
        this.setTradeButtonVisible(true);
    }

    private setTradeButtonVisible(value: boolean) {
        this.plusTradeButton.setVisible(value);
    }
}
