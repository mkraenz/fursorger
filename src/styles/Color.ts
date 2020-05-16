export enum Color {
    Black = "#000000",
    White = "#ffffff",
    WhiteSilver = "#F1F4E7",
    DarkGrey = "#222222",
    Red = "#f80606",
    Green = "#0db80b",
    HackerGreen = "#00ff00",
}

const to0x = (color: Color | string) => color.replace("#", "0x");
export const toHex = (color: Color | string) => parseInt(to0x(color), 16);
