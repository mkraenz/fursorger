import { ILocation } from "./ILocation";

export class City implements ILocation {
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
