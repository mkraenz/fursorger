import { IWare } from "./i-ware";

export interface IWareForCity extends IWare {
    readonly maxPrice: number;
    readonly minPrice: number;
}
