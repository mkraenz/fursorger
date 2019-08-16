import { ILocation } from "./ILocation";

export interface IPlayer {
    getLocation(): ILocation;
    getLocationName(): string;
    setLocation(location: ILocation): void;
}
