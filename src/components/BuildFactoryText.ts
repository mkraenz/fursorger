import { GameObjects, Scene } from "phaser";
import { MainSceneCfg } from "../styles/MainSceneCfg";
import { setTextShadow } from "../styles/setTextShadow";
import { TextConfig } from "../styles/Text";

const cfg = MainSceneCfg.buildFactory.text;

export class BuildFactoryText extends GameObjects.Text {
    constructor(scene: Scene, private dataSrc: () => number) {
        super(scene, cfg.x, cfg.y, name, TextConfig.xl);
        scene.add.existing(this);
        setTextShadow(this);
    }

    public preUpdate() {
        this.setText(this.dataSrc().toString());
    }
}
