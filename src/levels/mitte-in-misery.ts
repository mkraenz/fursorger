import { ILevel } from './ILevel';

export const levelMitteInMisery: ILevel = {
    name: 'Mitte in Misery',
    cities: [
        {
            name: 'Mitte',
            stock: 60,
            production: -4,
            x: 400,
            y: 250,
        },
        {
            name: 'Lichtenrade',
            stock: 6,
            production: -1,
            x: 420,
            y: 400,
        },
        {
            name: 'Potsdam',
            stock: 7,
            production: -1,
            x: 190,
            y: 492,
        },
        {
            name: 'Spandau',
            stock: 8,
            production: -1,
            x: 150,
            y: 80,
        },
    ],
    travelPaths: [
        {
            first: 'Mitte',
            second: 'Lichtenrade',
        },
        {
            first: 'Mitte',
            second: 'Potsdam',
        },
        {
            first: 'Mitte',
            second: 'Mitte',
        },
        {
            first: 'Mitte',
            second: 'Spandau',
        },
    ],
    player: {
        stock: 3,
        location: 'Mitte',
    },
    background: 'background2',
};
