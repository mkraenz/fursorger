import { Graph } from "graphlib";
import { ILocation } from "./ILocation";
import { IPlayer } from "./IPlayer";

export class Player implements IPlayer {
    constructor(
        private graph: Graph,
        private location: ILocation,
        public stock: number,
        public turn = 0,
        public factories = 0
    ) {}

    public take(): void {
        if (this.location.economy.stock > 0) {
            this.stock += 1;
            this.location.economy.stock -= 1;
        }
    }

    public store(): void {
        if (this.stock > 0) {
            this.stock -= 1;
            this.location.economy.stock += 1;
        }
    }

    public setLocation(location: ILocation): void {
        this.location = location;
        this.turn++;
        if (this.turn % 3 === 0 && this.turn > 0) {
            this.factories++;
        }
    }

    public getLocation() {
        return this.location;
    }

    public getLocationName() {
        return this.location.name;
    }
}
