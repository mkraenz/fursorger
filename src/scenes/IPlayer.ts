import { ILocation } from "./ILocation";

export interface IPlayer {
    stock: number;
    store(): void;
    getLocation(): ILocation;
    getLocationName(): string;
    setLocation(location: ILocation): void;
}
