import { Graph } from "graphlib";
import { City } from "./City";
import { CityName } from "./CityName";
import { IMainSceneParams } from "./IMainSceneParams";
import { Player } from "./Player";

export class LogicBuilder {
    public static create(): IMainSceneParams {
        const graph = new Graph({ directed: false });
        Object.values(CityName).forEach(name => {
            graph.setNode(name, new City(name, [6, 2, 1]));
            // graph.setNode(name, new City(name, economy));
        });
        const player = new Player(graph, graph.node(CityName.Athens));
        return {
            graph,
            player,
        };
    }
}
