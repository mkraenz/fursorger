import { GameObjects } from "phaser";
import { Color } from "../Color";
import { ICity } from "./ICity";
import { WareType } from "./wareType";

export class TextBuyPrice extends GameObjects.Text {
    private city!: Pick<ICity, "getBuyPrice">;
    private wareType!: WareType;
    public init(city: Pick<ICity, "getBuyPrice">, type: WareType) {
        this.city = city;
        this.wareType = type;
        this.setFontFamily("Arial")
            .setFontSize(32)
            .setColor(Color.black);
    }

    public update() {
        this.setText(`${this.city.getBuyPrice(this.wareType, 1)}`);
    }
}
