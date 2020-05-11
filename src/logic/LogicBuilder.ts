import { Graph } from "graphlib";
import { ILevel } from "../levels/ILevel";
import { LogicCity } from "./City";
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
                new LogicCity(city.name, city.stock, city.production)
            );
        });
        level.travelPaths.forEach(edge => {
            graph.setEdge(edge.first, edge.second);
        });
        const player = new Player(
            graph.node(level.player.location),
            level.player.stock
        );
        return {
            graph,
            player,
        };
    }
}
