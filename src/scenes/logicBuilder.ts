import { Graph } from "graphlib";
import { City } from "./City";
import { CityName } from "./CityName";
import { IMainSceneParams } from "./IMainSceneParams";
import { Player } from "./Player";
import { TravelPaths } from "./TravelPaths";

export class LogicBuilder {
    public static create(): IMainSceneParams {
        const graph = new Graph({ directed: false });
        Object.values(CityName).forEach(name => {
            graph.setNode(name, new City(name, [6, 2, 1]));
            // graph.setNode(name, new City(name, economy));
        });
        Object.values(TravelPaths).forEach(pathName => {
            const pathNameString = pathName as string;
            const sliceIndex = pathNameString.indexOf("-");
            const firstCity = pathNameString.slice(0, sliceIndex);
            const secondCity = pathNameString.slice(sliceIndex + 1);
            graph.setEdge(firstCity, secondCity, 1);
        });

        const player = new Player(graph, graph.node(CityName.Athens));
        return {
            graph,
            player,
        };
    }
}
