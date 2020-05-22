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
        {
            first: "Thudor",
            second: "Ustrela",
            points: [
                { x: 265, y: 619 },
                { x: 322, y: 626 },
                { x: 384, y: 610 },
                { x: 520, y: 655 },
            ],
        },
        {
            first: "Ustrela",
            second: "Ablesh",
            points: [
                { x: 520, y: 655 },
                { x: 676, y: 668 },
                { x: 723, y: 561 },
                { x: 897, y: 456 },
                { x: 811, y: 395 },
            ],
        },
        {
            first: "Ablesh",
            second: "Wesnain",
            points: [
                { x: 811, y: 395 },
                { x: 881, y: 341 },
                { x: 885, y: 278 },
                { x: 925, y: 251 },
            ],
        },
    ],
    player: { stock: 3, location: "Thudor" },
    background: "background",
};
