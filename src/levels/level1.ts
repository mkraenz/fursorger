import { ILevel } from "./ILevel";

export const level1: ILevel = {
    cities: [
        {
            name: "Bertl",
            stock: 9,
            production: -1,
            x: 453,
            y: 316,
        },
        {
            name: "Zismo",
            stock: 10,
            production: -1,
            x: 255,
            y: 682,
        },
        {
            name: "Seli",
            stock: 11,
            production: -1,
            x: 506,
            y: 136,
        },
        {
            name: "K'hrom",
            stock: 6,
            production: -1,
            x: 507,
            y: 637,
        },
        {
            name: "Norb",
            stock: 9,
            production: -1,
            x: 880,
            y: 130,
        },
        {
            name: "Ot",
            stock: 18,
            production: -1,
            x: 952,
            y: 643,
        },
        {
            name: "Cael",
            stock: 35,
            production: -1,
            x: 699,
            y: 476,
        },
        {
            name: "Alm",
            stock: 10,
            production: -1,
            x: 227,
            y: 154,
        },
    ],
    travelPaths: [
        {
            first: "Ot",
            second: "Bertl",
        },
        {
            first: "Seli",
            second: "Norb",
        },
        {
            first: "Seli",
            second: "Cael",
        },
        {
            first: "Cael",
            second: "K'hrom",
        },
        {
            first: "Zismo",
            second: "Alm",
        },
        {
            first: "Ot",
            second: "Norb",
        },
        {
            first: "Zismo",
            second: "K'hrom",
        },
        {
            first: "Bertl",
            second: "Cael",
        },
        {
            first: "Bertl",
            second: "Alm",
        },
        {
            first: "Ot",
            second: "Cael",
        },
    ],
    player: {
        stock: 0,
        location: "Alm",
    },
    background: "background2",
};
