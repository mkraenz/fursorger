import { Graph } from "graphlib";
import { City } from "./City";

export function getNode(graph: Graph, name: string): City {
    return graph.node(name);
}

export function getAllCities(graph: Graph): City[] {
    return graph.nodes().map(name => {
        const city = getNode(graph, name);
        return city;
    });
}
