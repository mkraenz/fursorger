import { CityName } from "./CityName";
import { ICity } from "./ICity";
import { ILocation } from "./ILocation";

export class City implements ICity, ILocation {
    constructor(
        public readonly name: CityName,
        private economy: {
            stock: number;
            consumption: number;
            production: number;
        }
    ) {}
}
