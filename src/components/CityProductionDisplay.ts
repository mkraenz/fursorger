import { GameObjects, Scene } from "phaser";
import { TextConfig } from "../styles/Text";

export class CityProductionDisplay extends GameObjects.Text {
    constructor(scene: Scene, private dataSrc: () => number) {
        super(scene, 0, 25, "", TextConfig.lg);
        scene.add.existing(this);
    }

    public preUpdate() {
        this.setText(`${this.dataSrc()}`);
    }
}
