import { Graph } from "graphlib";
import { City } from "./City";
import { CityName } from "./CityName";

export function getNode(graph: Graph, name: CityName): City {
    return graph.node(name);
}

export function getAllCities(graph: Graph): City[] {
    return graph.nodes().map(name => {
        const city = getNode(graph, name as CityName);
        return city;
    });
}
