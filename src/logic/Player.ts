import { isNil } from "lodash";
import { IPlayer } from "./IPlayer";

export class Player implements IPlayer {
    constructor(
        private location: { name: string; stock?: number },
        public stock: number,
        public turn = 0,
        public factories = 0
    ) {}

    get locationName() {
        return this.location.name;
    }

    public take(): void {
        if (!isNil(this.location.stock) && this.location.stock > 0) {
            this.stock += 1;
            this.location.stock -= 1;
        }
    }

    public store(): void {
        if (!isNil(this.location.stock) && this.stock > 0) {
            this.stock -= 1;
            this.location.stock += 1;
        }
    }

    public move(location: { name: string }): void {
        this.location = location;
        this.turn++;
        if (this.turn % 3 === 0 && this.turn > 0) {
            this.factories++;
        }
    }
}
