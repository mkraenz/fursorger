import { GameObjects, Scene } from "phaser";
import { MainSceneCfg as Cfg } from "../styles/MainSceneCfg";
import { TextConfig } from "../styles/Text";

export class TurnDisplay extends GameObjects.Text {
    constructor(scene: Scene, private getValue: () => number) {
        super(
            scene,
            Cfg.turnInfo.text.x,
            Cfg.turnInfo.text.y,
            "",
            TextConfig.xl
        );
        scene.add.existing(this);
        scene.add
            .image(Cfg.turnInfo.img.x, Cfg.turnInfo.img.y, "hourglass")
            .setScale(0.8);
    }

    public preUpdate() {
        this.setText(`${this.getValue()}`);
    }
}
