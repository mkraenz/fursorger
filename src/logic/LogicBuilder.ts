import { Graph } from "graphlib";
import { ILevel } from "../levels/ILevel";
import { LogicCity } from "./City";
import { IPlayer } from "./IPlayer";
import { Player } from "./Player";
import { Shop } from "./Shop";

export class LogicBuilder {
    public static create(
        level: ILevel
    ): {
        player: IPlayer;
        graph: Graph;
    } {
        const graph = new Graph({ directed: false });
        level.cities.forEach(city => {
            graph.setNode(
                city.name,
                new LogicCity(
                    city.name,
                    city.x,
                    city.y,
                    city.stock,
                    city.production
                )
            );
        });

        (level.shops || []).forEach(shop => {
            graph.setNode(
                shop.name,
                new Shop(shop.name, shop.x, shop.y, shop.price)
            );
        });

        level.travelPaths.forEach(edge => {
            graph.setEdge(edge.first, edge.second);
        });
        const player = new Player(
            graph.node(level.player.location),
            level.player.stock
        );
        return {
            graph,
            player,
        };
    }
}
