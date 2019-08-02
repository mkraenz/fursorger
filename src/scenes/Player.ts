import { Graph } from "graphlib";
import { IPlayer } from "./IPlayer";

export class Player implements IPlayer {
    constructor(private graph: Graph, private location: string) {}
}
