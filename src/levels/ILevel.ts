export interface ILevel {
    name: string;
    cities: ICity[];
    shops?: IShop[];
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
    secrets?: ISecret[];
}

export interface ICity {
    name: string;
    stock: number;
    production: number;
    x: number;
    y: number;
}

export interface IShop {
    name: string;
    price: number;
    x: number;
    y: number;
}

export interface ISecret {
    centerX: number;
    centerY: number;
    width: number;
    height: number;
    text: string;
}
