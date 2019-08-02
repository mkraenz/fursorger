import { Graph } from "graphlib";
import { IPlayer } from "./IPlayer";

export interface IMainSceneParams {
    player: IPlayer;
    graph: Graph;
}
