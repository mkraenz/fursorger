import { ICity } from "./ICity";
import { ILocation } from "./ILocation";

export class City implements ICity, ILocation {
    constructor(
        public readonly name: string,
        public economy: {
            stock: number;
            production: number;
        }
    ) {}

    public economize() {
        this.economy.stock += this.economy.production;
    }
}
