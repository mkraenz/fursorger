import { Graph } from "graphlib";
import { ILevel } from "../levels/ILevel";
import { City } from "./City";
import { IPlayer } from "./IPlayer";
import { Player } from "./Player";

export class LogicBuilder {
    public static create(
        level: ILevel
    ): {
        player: IPlayer;
        graph: Graph;
    } {
        const graph = new Graph({ directed: false });
        level.cities.forEach(city => {
            graph.setNode(
                city.name,
                new City(city.name, {
                    stock: city.stock,
                    production: city.production,
                })
            );
        });
        level.travelPaths.forEach(edge => {
            graph.setEdge(edge.first, edge.second);
        });
        const player = new Player(
            graph,
            graph.node(level.cities[0].name),
            level.playerStock
        );
        return {
            graph,
            player,
        };
    }
}
