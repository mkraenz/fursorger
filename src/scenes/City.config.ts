import { CityName } from "./CityName";

const cities = {
    // NOTE: Mecklenburg is used in lots of test
    [CityName.Athens]: {
        x: 100,
        y: 50,
    },
    [CityName.Bern]: {
        x: 500,
        y: 50,
    },
    [CityName.Cairo]: {
        x: 100,
        y: 300,
    },
};

export const cityConfig = {
    cities,
    /** The Player sells to the city for less than he buys. This factor describes that ratio. */
    sellToBuyPriceFactor: 0.82,
};
