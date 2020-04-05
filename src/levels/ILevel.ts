export interface ILevel {
    cities: ICity[];
    travelPaths: Array<{ first: string; second: string }>;
    background: string;
    player: { stock: number; location: string };
}

export interface ICity {
    name: string;
    stock: number;
    production: number;
    x: number;
    y: number;
}
