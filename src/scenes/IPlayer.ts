import { CityName } from "./CityName";
import { ILocation } from "./ILocation";

export interface IPlayer {
    factories: number;
    turn: number;
    stock: number;
    take(): void;
    store(): void;
    getLocation(): ILocation;
    getLocationName(): CityName;
    setLocation(location: ILocation): void;
}
