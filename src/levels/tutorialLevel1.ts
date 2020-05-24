import { ILevel } from "./ILevel";

export const tutorialLevel1: ILevel = {
    name: "First steps",
    cities: [
        { name: "Orsus", stock: 1, production: -1, x: 775, y: 430 },
        { name: "Copia", stock: 1, production: 1, x: 425, y: 333 },
    ],
    travelPaths: [
        {
            first: "Orsus",
            second: "Copia",
            points: [
                { x: 442, y: 346 },
                { x: 776, y: 432 },
            ],
        },
    ],
    player: { stock: 1, location: "Copia" },
    background: "map-tutorial",
};
