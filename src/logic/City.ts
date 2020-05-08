import { ILocation } from "./ILocation";

export class LogicCity implements ILocation {
    constructor(
        public readonly name: string,
        public economy: {
            stock: number;
            production: number;
        }
    ) {}

    public consumeOrProduce() {
        this.economy.stock += this.economy.production;
    }
}
