import { CityName } from "./CityName";
import { ICity } from "./ICity";
import { ILocation } from "./ILocation";

export class City implements ICity, ILocation {
    // economy= [stock, consume, production]
    constructor(
        public readonly name: CityName,
        private economy: {
            stock: number;
            consumption: number;
            production: number;
        }
    ) {}
}
