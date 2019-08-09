import { City } from "./City";

// tslint:disable-next-line:no-empty-interface
export interface IPlayer {
    getLocation(): City;
    setLocation(city: City): void;
    getLocationName(): string;
}
