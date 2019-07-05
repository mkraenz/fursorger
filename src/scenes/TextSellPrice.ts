import { GameObjects } from "phaser";
import { Color } from "../Color";
import { ICity } from "./ICity";
import { WareType } from "./wareType";

export class TextSellPrice extends GameObjects.Text {
    private city!: Pick<ICity, "getSellPrice">;
    private wareType!: WareType;
    public init(city: Pick<ICity, "getSellPrice">, type: WareType) {
        this.city = city;
        this.wareType = type;
        this.setFontFamily("Arial")
            .setFontSize(32)
            .setColor(Color.black);
    }

    public update() {
        this.setText(`${this.city.getSellPrice(this.wareType, 1)}`);
    }
}
