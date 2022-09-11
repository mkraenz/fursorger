import { ILevel } from './ILevel';

export const level2: ILevel = {
    name: 'Mountains and Cliffs',
    cities: [
        { name: 'Thudor', stock: 9, production: -1, x: 265, y: 619 },
        { name: 'Ustrela', stock: 6, production: -1, x: 520, y: 655 },
        { name: 'Wesnain', stock: 7, production: -1, x: 925, y: 251 },
        { name: 'Ablesh', stock: 8, production: -1, x: 811, y: 395 },
        { name: 'Eflar', stock: 0, production: 1, x: 540, y: 282 },
        { name: 'Iechein', stock: 6, production: -1, x: 98, y: 70 },
    ],
    travelPaths: [
        {
            first: 'Thudor',
            second: 'Ustrela',
            points: [
                { x: 520, y: 655 },
                { x: 384, y: 610 },
                { x: 322, y: 626 },
                { x: 265, y: 619 },
            ],
        },
        {
            first: 'Thudor',
            second: 'Eflar',
            points: [
                { x: 540, y: 282 },
                { x: 465, y: 290 },
                { x: 285, y: 482 },
                { x: 265, y: 619 },
            ],
        },
        {
            first: 'Ablesh',
            second: 'Wesnain',
            points: [
                { x: 925, y: 251 },
                { x: 885, y: 278 },
                { x: 881, y: 341 },
                { x: 811, y: 395 },
            ],
        },
        {
            first: 'Ustrela',
            second: 'Ablesh',
            points: [
                { x: 811, y: 395 },
                { x: 897, y: 456 },
                { x: 723, y: 561 },
                { x: 676, y: 668 },
                { x: 520, y: 655 },
            ],
        },
        {
            first: 'Ablesh',
            second: 'Eflar',
            points: [
                { x: 540, y: 282 },
                { x: 580, y: 407 },
                { x: 676, y: 461 },
                { x: 717, y: 445 },
                { x: 715, y: 381 },
                { x: 811, y: 395 },
            ],
        },
        {
            first: 'Iechein',
            second: 'Eflar',
            points: [
                { x: 540, y: 282 },
                { x: 465, y: 290 },
                { x: 98, y: 70 },
            ],
        },
    ],
    player: {
        stock: 3,
        location: 'Thudor',
    },
    background: 'background',
    secrets: [
        {
            text: 'Fursorger, you\nare not from here\nwhy do you help\nwith love and tear?',
            centerX: 506,
            centerY: 65,
            height: 50,
            width: 60,
        },
    ],
};
