export interface ICity {
    name: string;
    stock: number;
    production: number;
    x: number;
    y: number;
}

export interface IPlayer {
    stock: number;
    location: string;
    id: string;
}

export class Game {
    public cities: ICity[] = [
        { name: 'Ustrela', stock: 4, production: -1, x: 520, y: 655 },
        { name: 'Ablesh', stock: 6, production: -1, x: 811, y: 395 },
        { name: 'Eflar', stock: 6, production: -1, x: 540, y: 282 },
    ];
    public travelPaths: Array<{ first: string; second: string }> = [
        { first: 'Ustrela', second: 'Ablesh' },
        { first: 'Ablesh', second: 'Eflar' },
    ];
    public background: string = 'background';
    public player = {
        stock: 3,
        location: 'Ablesh',
    };
    public players: Map<string, IPlayer> = new Map();

    constructor(playerIds: string[]) {
        playerIds.forEach(id => {
            const player: IPlayer = {
                stock: 3,
                location: 'Ustrela',
                id,
            };
            this.players.set(id, player);
        });
    }
}
