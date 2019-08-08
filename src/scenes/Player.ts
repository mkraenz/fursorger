import { Graph } from "graphlib";
import { IPlayer } from "./IPlayer";

export class Player implements IPlayer {
    constructor(private graph: Graph, private location: string) {
        this.graph = graph;
        this.location = location;
    }

    public setLocation(city: string) {
        this.location = city;
    }

    public getLocation() {
        return this.location;
    }
}
