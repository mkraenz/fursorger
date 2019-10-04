import { CityName } from "./CityName";
import { ICity } from "./ICity";
import { ILocation } from "./ILocation";

export class City implements ICity, ILocation {
    constructor(
        public readonly name: CityName,
        public economy: {
            stock: number;
            consumption: number;
            production: number;
        }
    ) {}

    public consume() {
        this.economy.stock -= this.economy.consumption;
    }
}
