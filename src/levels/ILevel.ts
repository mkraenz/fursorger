export interface ILevel {
    cities: ICity[];
    travelPaths: Array<{ first: string; second: string }>;
    playerStock: number;
}

export interface ICity {
    name: string;
    stock: number;
    production: number;
    x: number;
    y: number;
}
