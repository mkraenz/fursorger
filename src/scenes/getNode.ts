import { Graph } from "graphlib";
import { City } from "./City";
import { CityName } from "./CityName";

export function getNode(graph: Graph, name: CityName): City {
    return graph.node(name);
}
