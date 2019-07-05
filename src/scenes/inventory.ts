import { IInventory } from "./i-inventory";
import { IWare } from "./i-ware";
import { WareType } from "./wareType";

export abstract class Inventory implements IInventory {
    protected wares: Map<WareType, IWare>;

    /** During production, make sure that we have an `IWare` for each `WareType` */
    constructor(wares: IWare[]) {
        this.wares = new Map<WareType, IWare>();
        wares.map(ware => this.wares.set(ware.type, ware));
    }
    public abstract hasMoney(totalPrice: number): boolean;

    /** Assumes existing ware for each type */
    public get(type: WareType): IWare {
        if (!this.wares.has(type)) {
            throw new Error(`WareType not found ${type}`);
        }
        return this.wares.get(type)!;
    }

    public isValidSell(type: WareType, quantity: number) {
        return this.get(type).getQuantity() - quantity >= 0;
    }

    public buy(type: WareType, quantity: number, _: number) {
        this.get(type).add(quantity);
    }

    public sell(type: WareType, quantity: number, _: number) {
        this.get(type).add(-quantity);
    }
}
