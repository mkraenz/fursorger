import { uniq } from "lodash";
import { CityName } from "./CityName";
import { IInventory } from "./i-inventory";
import { ILogic } from "./i-logic";
import { ICity } from "./ICity";
import { WareType } from "./wareType";

export class Logic implements ILogic {
    public selectedCity: CityName;
    private cities: Map<CityName, ICity>;
    private tradedQuantity = 1;

    constructor(
        private player: IInventory,
        cities: ICity[],
        startCity: CityName
    ) {
        if (!cities.length) {
            throw new Error("Must provide at least one city");
        }

        const hasDuplicateName =
            uniq(cities.map(value => value.name)).length !== cities.length;
        if (hasDuplicateName) {
            throw new Error("City names must be unique.");
        }

        this.cities = new Map(cities.map(value => [value.name, value]));
        this.selectedCity = startCity;
    }

    get city(): ICity {
        if (!this.cities.has(this.selectedCity)) {
            throw new Error(`City not found ${this.selectedCity}`);
        }
        return this.cities.get(this.selectedCity)!;
    }

    /** player buys */
    public buy(ware: WareType): void {
        const totalPrice = this.city.getBuyPrice(ware, this.tradedQuantity);
        this.trade(this.player, this.city, ware, totalPrice);
    }

    /** player sells */
    public sell(ware: WareType): void {
        const totalPrice = this.city.getSellPrice(ware, this.tradedQuantity);
        this.trade(this.city, this.player, ware, totalPrice);
    }

    private trade(
        buyer: IInventory,
        seller: IInventory,
        ware: WareType,
        totalPrice: number
    ) {
        if (
            seller.isValidSell(ware, this.tradedQuantity) &&
            buyer.hasMoney(totalPrice)
        ) {
            buyer.buy(ware, this.tradedQuantity, totalPrice);
            seller.sell(ware, this.tradedQuantity, totalPrice);
        }
    }
}
