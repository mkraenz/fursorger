import { Graph } from "graphlib";
import { LogicCity } from "./City";

export function getNode(graph: Graph, name: string): LogicCity {
    return graph.node(name);
}

export function getAllCities(graph: Graph): LogicCity[] {
    return graph.nodes().map(name => {
        const city = getNode(graph, name);
        return city;
    });
}
