import { ILocation } from "./ILocation";

export class LogicCity implements ILocation {
    constructor(
        public readonly name: string,
        public stock: number,
        public production: number
    ) {}

    public consumeOrProduce() {
        this.stock += this.production;
    }
}
