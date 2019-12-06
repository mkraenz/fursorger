import { ILevel } from "./ILevel";

const level1: ILevel = {
    cities: [
        { name: "Athens", stock: 6, production: -1, x: 150, y: 100 },
        { name: "Bern", stock: 6, production: -1, x: 500, y: 200 },
        { name: "Cairo", stock: 6, production: -1, x: 150, y: 300 },
    ],
    travelPaths: [
        { first: "Athens", second: "Bern" },
        { first: "Bern", second: "Cairo" },
    ],
};
const level2: ILevel = {
    cities: [
        { name: "Athens", stock: 6, production: -1, x: 150, y: 100 },
        { name: "Bern", stock: 6, production: -1, x: 500, y: 200 },
        { name: "Cairo", stock: 7, production: -1, x: 150, y: 300 },
        { name: "Dublin", stock: 8, production: -1, x: 500, y: 400 },
    ],
    travelPaths: [
        { first: "Athens", second: "Bern" },
        { first: "Dublin", second: "Cairo" },
        { first: "Bern", second: "Cairo" },
        { first: "Dublin", second: "Athens" },
    ],
};

export const levelArray = [level1, level2];
