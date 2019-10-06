import { CityName } from "./CityName";
import { ICity } from "./ICity";
import { ILocation } from "./ILocation";

export class City implements ICity, ILocation {
    constructor(
        public readonly name: CityName,
        public economy: {
            stock: number;
            production: number;
        }
    ) {}

    public setFactory() {
        this.economy.production += 1;
    }

    public economize() {
        this.economy.stock += this.economy.production;
    }
}
