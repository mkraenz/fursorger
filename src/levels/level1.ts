import { ILevel } from "./ILevel";

export const level1: ILevel = {
    cities: [
        { name: "Ustrela", stock: 4, production: -1, x: 520, y: 655 },
        { name: "Ablesh", stock: 6, production: -1, x: 811, y: 395 },
        { name: "Eflar", stock: 6, production: -1, x: 540, y: 282 },
    ],
    travelPaths: [
        { first: "Ustrela", second: "Ablesh" },
        { first: "Ablesh", second: "Eflar" },
    ],
    player: { stock: 3, location: "Ustrela" },
    background: "background",
};
