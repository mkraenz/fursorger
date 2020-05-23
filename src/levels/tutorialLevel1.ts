import { ILevel } from "./ILevel";

export const tutorialLevel1: ILevel = {
    name: "First steps",
    cities: [
        { name: "Orsus", stock: 1, production: -1, x: 775, y: 430 },
        { name: "Copia", stock: 2, production: 1, x: 425, y: 333 },
    ],
    travelPaths: [{ first: "Orsus", second: "Copia" }],
    player: { stock: 3, location: "Copia" },
    background: "map-tutorial",
};
