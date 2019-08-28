import { ILocation } from "./ILocation";

export interface IPlayer {
    stock: number;
    getLocation(): ILocation;
    getLocationName(): string;
    setLocation(location: ILocation): void;
}
