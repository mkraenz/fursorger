import { Graph } from "graphlib";
import { CityName } from "./CityName";
import { IMainSceneParams } from "./IMainSceneParams";
import { Player } from "./Player";

export class LogicBuilder {
    public static create(): IMainSceneParams {
        const graph = new Graph({ directed: false });
        Object.values(CityName).forEach(name => {
            graph.setNode(name, name);
            // graph.setNode(name, new City(name));
        });
        const player = new Player(graph, graph.node(CityName.Holstein));
        return {
            graph,
            player,
        };
    }
}
