import { GameObjects, Scene } from "phaser";
import { MainSceneCfg } from "../styles/MainSceneCfg";

export class RestartButton extends GameObjects.Image {
    constructor(scene: Scene, onPointerUp: () => void) {
        super(scene, MainSceneCfg.restart.x, MainSceneCfg.restart.y, "restart");
        scene.add.existing(this);
        this.setInteractive();
        this.on("pointerup", onPointerUp);
    }
}
