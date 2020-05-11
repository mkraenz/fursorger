import { cloneDeep } from "lodash";
import { GameObjects, Scene } from "phaser";
import { GrowShrinkAnimPlugin } from "../anims/GrowShrinkAnimPlugin";
import { ILevel } from "../levels/ILevel";
import { LogicCity } from "../logic/City";
import { TextConfig } from "../styles/Text";

export class ExportLevelButton extends GameObjects.Text {
    constructor(
        scene: Scene,
        private baseDataSrc: () => ILevel,
        private overWriteDataSrc: () => LogicCity[]
    ) {
        super(scene, 95, 747, "Export", TextConfig.sm);
        scene.add.existing(this);
        this.setInteractive();
        this.on("pointerup", () => this.saveToFile());
        new GrowShrinkAnimPlugin(scene, this);
    }

    private saveToFile() {
        const level = this.getLevelData();
        const data = JSON.stringify(level, null, 4);
        const blob = new Blob([data], {
            type: "application/json",
        });
        saveAs(blob, "level.json");
    }

    private getLevelData() {
        const level = cloneDeep(this.baseDataSrc());
        const cities = this.overWriteDataSrc();
        const adjustedCities = cities.map(city => {
            const cityBaseData = level.cities.find(c => c.name === city.name);
            return {
                ...cityBaseData,
                ...city,
            };
        });
        level.cities = adjustedCities;
        return level;
    }
}
