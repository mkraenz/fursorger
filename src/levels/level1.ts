import { ILevel } from "./ILevel";

export const level1: ILevel = {
    name: "Beginnings",
    cities: [
        { name: "Ustrela", stock: 4, production: -1, x: 520, y: 655 },
        { name: "Ablesh", stock: 6, production: -1, x: 811, y: 395 },
        { name: "Eflar", stock: 6, production: -1, x: 540, y: 282 },
    ],
    shops: [{ name: "shop1", price: 1, x: 570, y: 550 }],

    travelPaths: [
        {
            first: "Ustrela",
            second: "Ablesh",
            points: [
                { x: 811, y: 395 },
                { x: 897, y: 456 },
                { x: 723, y: 561 },
                { x: 676, y: 668 },
                { x: 520, y: 655 },
            ],
        },
        {
            first: "Ablesh",
            second: "Eflar",
            points: [
                { x: 540, y: 282 },
                { x: 580, y: 407 },
                { x: 676, y: 461 },
                { x: 717, y: 445 },
                { x: 715, y: 381 },
                { x: 811, y: 395 },
            ],
        },
        { first: "shop1", second: "Ustrela", points: [] },
    ],
    player: { stock: 3, location: "Ustrela" },
    background: "background",
};
