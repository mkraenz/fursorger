export interface ILevel {
    name?: string;
    cities: ICity[];
    travelPaths: Array<{
        first: string;
        second: string;
        points?: Array<{ x: number; y: number }>;
    }>;
    background: string;
    player: {
        stock: number;
        location: string;
    };
}

export interface ICity {
    name: string;
    stock: number;
    production: number;
    x: number;
    y: number;
}
