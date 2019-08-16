import { Graph } from "graphlib";
import { City } from "./City";
import { CityName } from "./CityName";
import { IMainSceneParams } from "./IMainSceneParams";
import { Player } from "./Player";
import { TRAVEL_PATHS } from "./TravelPaths";

export class LogicBuilder {
    public static create(): IMainSceneParams {
        const graph = new Graph({ directed: false });
        Object.values(CityName).forEach(name => {
            graph.setNode(
                name,
                new City(name, { consumption: 2, stock: 6, production: 1 })
            );
        });
        TRAVEL_PATHS.forEach(edge => {
            graph.setEdge(edge.first, edge.second);
        });
        const player = new Player(graph, graph.node(CityName.Athens));
        return {
            graph,
            player,
        };
    }
}
