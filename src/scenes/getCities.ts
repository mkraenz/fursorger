import { CityName } from "./CityName";

// one based
export function getCities(level: number) {
    let numberOfCities = 0;
    switch (level) {
        case 1:
            numberOfCities = 3;
            break;
        case 2:
            numberOfCities = 4;
            break;
        default:
            throw Error(`level ${level} has no case in getCities`);
    }
    return Object.values(CityName).slice(0, numberOfCities);
}
