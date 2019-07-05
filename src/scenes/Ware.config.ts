import { WareType } from "./wareType";

export const wareConfig = {
    maxPrice: {
        [WareType.Furs]: 355,
        [WareType.Juwelry]: 670,
        [WareType.Salt]: 48,
    },
    minPrice: {
        [WareType.Furs]: 130,
        [WareType.Juwelry]: 215,
        [WareType.Salt]: 8,
    },
};
