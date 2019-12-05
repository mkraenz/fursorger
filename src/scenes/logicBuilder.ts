import { Graph } from "graphlib";
import { City } from "./City";
import { IMainSceneParams } from "./IMainSceneParams";
import { levelArray } from "./levels";
import { Player } from "./Player";

export class LogicBuilder {
    // TODO #55: make data type for level
    public static create(level: number): IMainSceneParams {
        const graph = new Graph({ directed: false });
        levelArray[level - 1].cities.forEach(city => {
            graph.setNode(
                city.name,
                new City(city.name, {
                    stock: city.stock,
                    production: city.production,
                })
            );
        });
        levelArray[level - 1].travelPaths.forEach(edge => {
            graph.setEdge(edge.first, edge.second);
        });
        const player = new Player(
            graph,
            graph.node(levelArray[level - 1].cities[0].name)
        );
        return {
            graph,
            player,
        };
    }
}
