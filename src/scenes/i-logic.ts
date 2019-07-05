import { WareType } from "./wareType";

export interface ILogic {
    buy(ware: WareType): void;
    sell(ware: WareType): void;
}
