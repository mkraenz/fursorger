import { CityName } from "./CityName";
import { IInventory } from "./i-inventory";
import { IWare } from "./i-ware";
import { WareType } from "./wareType";

export interface ICity extends IInventory {
    name: CityName;
    getSellPrice(ware: WareType, quantity: number): number;
    getBuyPrice(ware: WareType, quantity: number): number;
    get(ware: WareType): IWare;
    consume(): void;
}
