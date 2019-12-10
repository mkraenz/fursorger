import { Graph } from "graphlib";
import { City } from "./City";
import { ILevel } from "./ILevel";
import { IMainSceneParams } from "./IMainSceneParams";
import { Player } from "./Player";

export class LogicBuilder {
    public static create(level: ILevel): IMainSceneParams {
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
