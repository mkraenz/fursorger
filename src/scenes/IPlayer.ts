import { ILocation } from "./ILocation";

export interface IPlayer {
    turn: number;
    stock: number;
    take(): void;
    store(): void;
    getLocation(): ILocation;
    getLocationName(): string;
    setLocation(location: ILocation): void;
}
