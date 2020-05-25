import { ILocation } from "./ILocation";
import { IPlayer } from "./IPlayer";

export class Player implements IPlayer {
    constructor(
        private location: ILocation,
        public stock: number,
        public turn = 0,
        public factories = 0
    ) {}

    get locationName() {
        return this.location.name;
    }

    public take(): void {
        if (this.location.stock > 0) {
            this.stock += 1;
            this.location.stock -= 1;
        }
    }

    public store(): void {
        if (this.stock > 0) {
            this.stock -= 1;
            this.location.stock += 1;
        }
    }

    public move(location: ILocation): void {
        this.location = location;
        this.turn++;
        if (this.turn % 1 === 0 && this.turn > 0) {
            this.factories++;
        }
    }
}
