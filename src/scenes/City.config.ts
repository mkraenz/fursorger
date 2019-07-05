import { CityName } from "./CityName";

interface ICityConfig {
    name: CityName;
}

const citiesArray: ICityConfig[] = [
    { name: CityName.Mecklenburg },
    { name: CityName.Holstein }
];

const cities = new Map<CityName, ICityConfig>(
    citiesArray.map(value => [value.name, value])
);

export const cityConfig = {
    cities,
    /** The Player sells to the city for less than he buys. This factor describes that ratio. */
    sellToBuyPriceFactor: 0.82,
};
