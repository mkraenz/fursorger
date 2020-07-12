import { cloneDeep } from "lodash";
import { ILevel } from "../levels/ILevel";
import { LogicCity } from "../logic/City";
import { Shop } from "../logic/Shop";

export class LevelExporter {
    constructor(
        private leveldataSrc: () => ILevel,
        private citiesDataSrc: () => Array<Shop | LogicCity>,
        private playerDataSrc: () => {
            locationName: string;
            stock: number;
        }
    ) {}

    public get(): ILevel {
        const level = cloneDeep(this.leveldataSrc());
        const cities = this.citiesDataSrc().filter(LogicCity.instanceOf);
        const adjustedCities: ILevel["cities"] = cities.map(city => {
            const cityBaseData = level.cities.find(c => c.name === city.name);
            return {
                ...cityBaseData,
                ...city,
            };
        });
        const player = this.playerDataSrc();
        const adjustedPlayer: ILevel["player"] = {
            location: player.locationName,
            stock: player.stock,
        };
        level.cities = adjustedCities;
        level.player = adjustedPlayer;
        return level;
    }
}
