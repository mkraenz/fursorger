import { ILevel } from "./ILevel";

export const levelBrandenburg: ILevel = {
    name: "Brandenburg",
    cities: [
        {
            name: "Berlin",
            stock: 0,
            production: 1,
            x: 450,
            y: 280,
        },
        {
            name: "Beelitz",
            stock: 5,
            production: -1,
            x: 600,
            y: 100,
        },
        {
            name: "Mahlow",
            stock: 7,
            production: -1,
            x: 600,
            y: 430,
        },
        {
            name: "Blankenfelde",
            stock: 8,
            production: -1,
            x: 250,
            y: 100,
        },
        {
            name: "Rangsdorf",
            stock: 3,
            production: -1,
            x: 250,
            y: 430,
        },
    ],
    travelPaths: [
        {
            first: "Berlin",
            second: "Mahlow",
        },
        {
            first: "Berlin",
            second: "Beelitz",
        },
        {
            first: "Berlin",
            second: "Rangsdorf",
        },
        {
            first: "Berlin",
            second: "Blankenfelde",
        },
        {
            first: "Beelitz",
            second: "Blankenfelde",
        },
        {
            first: "Beelitz",
            second: "Mahlow",
        },
        {
            first: "Rangsdorf",
            second: "Blankenfelde",
        },
        {
            first: "Rangsdorf",
            second: "Mahlow",
        },
    ],
    player: {
        stock: 3,
        location: "Berlin",
    },
    background: "background2",
};
