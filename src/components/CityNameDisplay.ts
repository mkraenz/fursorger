import { GameObjects, Scene } from "phaser";
import { setWhiteOutlineShadow } from "../styles/setWhiteOutlineShadow";
import { TextConfig } from "../styles/Text";

export class CityNameDisplay extends GameObjects.Text {
    constructor(scene: Scene, name: string) {
        super(scene, -40, -45, name, TextConfig.md);
        scene.add.existing(this);
        setWhiteOutlineShadow(this);
    }
}
