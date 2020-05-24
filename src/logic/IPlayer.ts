export interface IPlayer {
    factories: number;
    turn: number;
    stock: number;
    locationName: string;
    take(): void;
    store(): void;
    move(location: { name: string }): void;
}
