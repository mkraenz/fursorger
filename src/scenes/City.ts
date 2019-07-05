import { cityConfig } from "./City.config";
import { CityName } from "./CityName";
import { ICity } from "./ICity";
import { Inventory } from "./inventory";
import { IWareForCity } from "./IWareForCity";
import { WareType } from "./wareType";

export class City extends Inventory implements ICity {
    constructor(wares: IWareForCity[], public readonly name: CityName) {
        super(wares);
    }

    public get(type: WareType): IWareForCity {
        return super.get(type) as IWareForCity;
    }

    /** player sells to city */
    public getSellPrice(ware: WareType, tradedQuantity: number): number {
        const theWare = this.get(ware);
        const currentStock = theWare.getQuantity();

        let totalPrice = 0;
        for (
            let quantity = currentStock;
            quantity < currentStock + tradedQuantity;
            quantity++
        ) {
            totalPrice += this.getPrice(theWare, quantity);
        }
        return Math.round(totalPrice * cityConfig.sellToBuyPriceFactor);
    }

    /** player buys from city */
    public getBuyPrice(ware: WareType, tradedQuantity: number): number {
        const theWare = this.get(ware);
        const currentStock = theWare.getQuantity();
        let totalPrice = 0;
        for (
            let quantity = currentStock;
            quantity > currentStock - tradedQuantity;
            quantity--
        ) {
            totalPrice += this.getPrice(theWare, quantity);
        }
        return Math.round(totalPrice);
    }

    public hasMoney(_: number) {
        return true;
    }

    public consume() {
        this.wares.forEach(ware => {
            if (ware.getQuantity() > 0) {
                ware.add(-1);
            }
        });
    }

    private getPrice(ware: IWareForCity, quantity: number) {
        if (quantity === 0) {
            return ware.maxPrice;
        }
        return (ware.maxPrice - ware.minPrice) / quantity + ware.minPrice;
    }
}
