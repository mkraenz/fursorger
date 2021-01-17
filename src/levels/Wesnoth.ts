import { ILevel } from "./ILevel";

export const Wesnoth: ILevel = {
    name: "Wesnoth North-West Elensefar to Dan Tonk",
    cities: [
        {
            name: "Elensefar",
            stock: 50,
            production: 5,
            x: 300,
            y: 295,
        },
        {
            name: "Halstead",
            stock: 12,
            production: -1,
            x: 305,
            y: 416,
        },
        {
            name: "Careyn",
            stock: 6,
            production: -1,
            x: 424,
            y: 313,
        },
        {
            name: "Aldril",
            stock: 22,
            production: -4,
            x: 352,
            y: 530,
        },
        {
            name: "Dan Tonk",
            stock: 16,
            production: -2,
            x: 600,
            y: 450,
        },
    ],
    travelPaths: [
        {
            first: "Elensefar",
            second: "Careyn",
        },
        {
            first: "Careyn",
            second: "Halstead",
        },
        {
            first: "Halstead",
            second: "Aldril",
        },
        {
            first: "Aldril",
            second: "Dan Tonk",
        },
        {
            first: "Dan Tonk",
            second: "Careyn",
        },
    ],
    player: {
        stock: 3,
        location: "Elensefar",
    },
    background: "map-wesnoth",
};
