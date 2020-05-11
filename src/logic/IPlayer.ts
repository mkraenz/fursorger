import { ILocation } from "./ILocation";

export interface IPlayer {
    factories: number;
    turn: number;
    stock: number;
    locationName: string;
    take(): void;
    store(): void;
    getLocation(): ILocation;
    getLocationName(): string;
    setLocation(location: ILocation): void;
}
