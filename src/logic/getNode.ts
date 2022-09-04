import { Graph } from 'graphlib';
import { LogicCity } from './City';
import { Shop } from './Shop';

export function getNode(graph: Graph, name: string): LogicCity | Shop {
    return graph.node(name);
}

export function getNodes(graph: Graph): Array<LogicCity | Shop> {
    return graph.nodes().map((name) => {
        const city = getNode(graph, name);
        return city;
    });
}

export function getAllCities(graph: Graph): LogicCity[] {
    return graph
        .nodes()
        .map((name) => {
            const node = getNode(graph, name);
            return node;
        })
        .filter(LogicCity.instanceOf);
}
