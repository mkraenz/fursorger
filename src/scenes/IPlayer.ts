import { IWare } from "./i-ware";
import { WareType } from "./wareType";

export interface IPlayer {
    getMoney(): number;
    get(ware: WareType): IWare;
}
