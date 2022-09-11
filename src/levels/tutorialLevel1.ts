import { ILevel } from './ILevel';

const RICH_CITY = 'Copia';
const POOR_CITY = 'Orsus';

export const tutorialLevel1: ILevel = {
    name: 'First steps',
    cities: [
        { name: POOR_CITY, stock: 1, production: -1, x: 775, y: 430 },
        { name: RICH_CITY, stock: 1, production: 1, x: 425, y: 333 },
    ],
    travelPaths: [
        {
            first: POOR_CITY,
            second: RICH_CITY,
            points: [
                { x: 442, y: 346 },
                { x: 776, y: 432 },
            ],
        },
    ],
    player: {
        stock: 1,
        location: RICH_CITY,
    },
    background: 'map-tutorial',
    secrets: [
        {
            text: `${RICH_CITY}'s fertile lands seem to withstand the Fiery Rain... for now.`,
            centerX: 336,
            centerY: 242,
            height: 50,
            width: 50,
        },
        {
            text: `${POOR_CITY} suffers from the Crisis\n and its reserves are dwindling.`,
            centerX: 713,
            centerY: 467,
            height: 30,
            width: 50,
        },
    ],
};
