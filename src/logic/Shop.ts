import { INode } from './INode';

export class Shop implements INode {
    constructor(
        public readonly name: string,
        public x: number,
        public y: number,
        public price: number
    ) {}
}
