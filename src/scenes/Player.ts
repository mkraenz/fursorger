import { Graph } from "graphlib";
import { ILocation } from "./ILocation";
import { IPlayer } from "./IPlayer";

export class Player implements IPlayer {
    constructor(
        private graph: Graph,
        private location: ILocation,
        public stock = 3
    ) {}

    public store(): void {
        if (this.stock > 0) {
            this.stock -= 1;
            this.location.economy.stock += 1;
        }
    }

    public setLocation(location: ILocation): void {
        this.location = location;
    }

    public getLocation() {
        return this.location;
    }

    public getLocationName() {
        return this.location.name;
    }
}
