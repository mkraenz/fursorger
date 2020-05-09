import { GameObjects, Scene } from "phaser";
import { GrowShrinkAnimPlugin } from "../anims/GrowShrinkAnimPlugin";
import { MainSceneCfg } from "../styles/MainSceneCfg";

export class RestartButton extends GameObjects.Image {
    constructor(scene: Scene, onPointerUp: () => void) {
        super(scene, MainSceneCfg.restart.x, MainSceneCfg.restart.y, "restart");
        scene.add.existing(this);
        this.setInteractive();
        this.on("pointerup", onPointerUp);
        new GrowShrinkAnimPlugin(scene, this);
    }
}
