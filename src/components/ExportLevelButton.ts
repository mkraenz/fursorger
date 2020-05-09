import { GameObjects, Scene } from "phaser";
import { ILevel } from "../levels/ILevel";
import { TextConfig } from "../styles/Text";

export class ExportLevelButton extends GameObjects.Text {
    constructor(scene: Scene, private dataSrc: () => ILevel) {
        super(scene, 132, 747, "Export", TextConfig.sm);
        scene.add.existing(this);
        this.setInteractive();
        this.on("pointerup", () => this.saveToFile());
    }

    private saveToFile() {
        const level = this.dataSrc();
        const data = JSON.stringify(level, null, 4);
        const blob = new Blob([data], {
            type: "application/json",
        });
        saveAs(blob, "level.json");
    }
}
