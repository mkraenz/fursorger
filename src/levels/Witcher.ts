import { ILevel } from "./ILevel";

export const Witcher: ILevel = {
    name: "Witcher's Winter",
    cities: [
        {
            name: "Eate",
            stock: 3,
            production: 3,
            x: 876,
            y: 367,
        },
        {
            name: "Velen",
            stock: 6,
            production: -1,
            x: 503,
            y: 134,
        },
        {
            name: "Birke",
            stock: 7,
            production: -1,
            x: 648,
            y: 631,
        },
        {
            name: "Vaerne",
            stock: 21,
            production: -4,
            x: 195,
            y: 407,
        },
    ],
    shops: [
        {
            name: "Belleteyn",
            price: 3,
            x: 458,
            y: 700,
        },
    ],
    travelPaths: [
        {
            first: "Birke",
            second: "Belleteyn",
        },
        {
            first: "Eate",
            second: "Velen",
        },
        {
            first: "Birke",
            second: "Eate",
        },
        {
            first: "Birke",
            second: "Velen",
        },
        {
            first: "Vaerne",
            second: "Birke",
        },
        {
            first: "Vaerne",
            second: "Velen",
        },
    ],
    player: {
        stock: 3,
        location: "Eate",
    },
    background: "background2",
};
