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

    public economize() {
        this.economy.stock += this.economy.production;
    }
}
