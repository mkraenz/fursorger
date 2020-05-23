import { ILevel } from "./ILevel";

export const level2: ILevel = {
    name: "Mountains and Cliffs",
    cities: [
        { name: "Thudor", stock: 9, production: -1, x: 265, y: 619 },
        { name: "Ustrela", stock: 6, production: -1, x: 520, y: 655 },
        { name: "Wesnain", stock: 7, production: -1, x: 925, y: 251 },
        { name: "Ablesh", stock: 8, production: -1, x: 811, y: 395 },
        { name: "Eflar", stock: 0, production: 1, x: 540, y: 282 },
        { name: "Iechein", stock: 6, production: -1, x: 98, y: 70 },
    ],
    travelPaths: [
        { first: "Thudor", second: "Ustrela" },
        { first: "Thudor", second: "Eflar" },
        { first: "Ablesh", second: "Wesnain" },
        { first: "Ustrela", second: "Ablesh" },
        { first: "Ablesh", second: "Eflar" },
        { first: "Iechein", second: "Eflar" },
    ],
    player: { stock: 3, location: "Thudor" },
    background: "background",
};
