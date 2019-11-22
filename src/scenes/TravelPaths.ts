import { CityName as C } from "./CityName";

export type TravelPathKey = keyof typeof TRAVEL_PATHS;

export const TRAVEL_PATHS = {
    1: [
        { first: C.Athens, second: C.Bern },
        { first: C.Bern, second: C.Cairo },
    ],
    2: [
        { first: C.Athens, second: C.Bern },
        { first: C.Bern, second: C.Cairo },
        { first: C.Cairo, second: C.Dublin },
        { first: C.Dublin, second: C.Athens },
    ],
};
