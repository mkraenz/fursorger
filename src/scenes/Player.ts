import { Inventory } from "./inventory";
import { IPlayer } from "./IPlayer";
import { WareType } from "./wareType";

export class Player extends Inventory implements IPlayer {
    private money = 1000;

    public hasMoney(totalPrice: number): boolean {
        return totalPrice <= this.money;
    }

    public getMoney(): number {
        return this.money;
    }

    public buy(type: WareType, quantity: number, totalPrice: number) {
        super.buy(type, quantity, totalPrice);
        this.money -= totalPrice;
    }

    public sell(type: WareType, quantity: number, totalPrice: number) {
        super.sell(type, quantity, totalPrice);
        this.money += totalPrice;
    }
}
