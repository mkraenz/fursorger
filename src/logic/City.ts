import { INode } from './INode';
import { IStorage } from './IStorage';

export class LogicCity implements IStorage, INode {
    public static instanceOf(x: any): x is LogicCity {
        return x instanceof LogicCity;
    }

    constructor(
        public readonly name: string,
        public x: number,
        public y: number,
        public stock: number,
        public production: number
    ) {}

    public consumeOrProduce() {
        this.stock += this.production;
    }
}
