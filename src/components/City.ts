import { GameObjects, Scene } from "phaser";
import { CityImage } from "./CityImage";
import { PlusMinusButton } from "./PlusMinusButton";

export class City extends GameObjects.Container {
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
        this.setName(name);

        this.setDepth(1);
        this.setSize(170, 1000); // must specify Shape or setSize for interactivity
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
}
