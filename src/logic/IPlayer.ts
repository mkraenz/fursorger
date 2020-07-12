export interface IPlayer {
    factories: number;
    turn: number;
    stock: number;
    locationName: string;
    hasFactory(): boolean;
    isInCity(): boolean;
    take(): void;
    store(): void;
    move(location: { name: string }): void;
}
