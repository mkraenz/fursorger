import { Graph } from "graphlib";
import { City } from "./City";
import { CityName } from "./CityName";
import { getCities } from "./getCities";
import { IMainSceneParams } from "./IMainSceneParams";
import { Player } from "./Player";
import { TRAVEL_PATHS, TravelPathKey } from "./TravelPaths";

export class LogicBuilder {
    public static create(level: TravelPathKey): IMainSceneParams {
        const graph = new Graph({ directed: false });
        getCities(level).forEach(name => {
            graph.setNode(name, new City(name, { stock: 6, production: -1 }));
        });
        TRAVEL_PATHS[level].forEach(edge => {
            graph.setEdge(edge.first, edge.second);
        });
        const player = new Player(graph, graph.node(CityName.Athens));
        return {
            graph,
            player,
        };
    }
}
