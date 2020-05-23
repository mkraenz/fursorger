import { ILevel } from "./ILevel";

export const level3: ILevel = {
    name: "To the Mountains",
    cities: [
        { name: "Thudor", stock: 3, production: -1, x: 265, y: 619 },
        { name: "Ustrela", stock: 0, production: 1, x: 520, y: 655 },
        { name: "Ablesh", stock: 3, production: -1, x: 811, y: 395 },
        { name: "Wesnain", stock: 7, production: -1, x: 925, y: 251 },
    ],
    travelPaths: [
        { first: "Thudor", second: "Ustrela" },
        { first: "Ustrela", second: "Ablesh" },
        { first: "Ablesh", second: "Wesnain" },
    ],
    player: { stock: 3, location: "Thudor" },
    background: "background",
};
