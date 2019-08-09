import { Graph } from "graphlib";
import { City } from "./City";
import { IPlayer } from "./IPlayer";

export class Player implements IPlayer {
    constructor(private graph: Graph, private location: City) {
        this.graph = graph;
        this.location = location;
    }

    public setLocation(city: City) {
        this.location = city;
    }

    public getLocation() {
        return this.location;
    }
    public getLocationName() {
        return this.location.getName();
    }
}
