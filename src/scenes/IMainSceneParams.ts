import { ILogic } from "./i-logic";
import { ICity } from "./ICity";
import { IPlayer } from "./IPlayer";

export interface IMainSceneParams {
    logic: ILogic;
    player: IPlayer;
    city: ICity;
}
