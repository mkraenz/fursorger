import { ILevel } from "./ILevel";

export const level4: ILevel = {
    cities: [
        { name: "Thudor", stock: 6, production: -1, x: 265, y: 619 },
        { name: "Ustrela", stock: 68, production: -5, x: 520, y: 655 },
        { name: "Ablesh", stock: 8, production: -1, x: 811, y: 395 },
        { name: "Eflar", stock: 5, production: -1, x: 540, y: 282 },
        { name: "Iechein", stock: 0, production: 2, x: 98, y: 70 },
    ],
    travelPaths: [
        { first: "Thudor", second: "Ustrela" },
        { first: "Ustrela", second: "Ablesh" },
        { first: "Ablesh", second: "Eflar" },
        { first: "Iechein", second: "Eflar" },
    ],
    playerStock: 3,
    background: "background",
};
