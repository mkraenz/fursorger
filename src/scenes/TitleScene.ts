import { Scene } from "phaser";
import { gameConfig } from "../game-config";
import { EditorScene } from "./editorScene";
import { MainScene } from "./mainScene";

export class TitleScene extends Scene {
    constructor() {
        super({
            key: "TitleScene",
        });
    }

    public create(): void {
        const bg = this.add
            .image(0, 0, "titleSceneBG")
            .setOrigin(0)
            .setDisplaySize(
                gameConfig.scale.width as number,
                gameConfig.scale.height as number
            );
        const singlePlayerButton = this.add
            .text(200, 300, "Singleplayer")
            .setInteractive();
        const editorModeButton = this.add
            .text(200, 360, "Editor Mode")
            .setInteractive();
        const lawOfTheUniverse = this.add
            .text(
                200,
                420,
                "This game is made by the most awesome guys in the universe. Period."
            )
            .setInteractive();
        editorModeButton.addListener("pointerup", () => {
            this.scene.add("EditorScene", EditorScene, true);
            this.scene.remove(this);
        });
        singlePlayerButton.addListener("pointerup", () => {
            this.scene.add("MainScene", MainScene, true);
            this.scene.remove(this);
        });
        lawOfTheUniverse.addListener("pointerup", () => {
            lawOfTheUniverse.setText("It's true!");
        });
    }
}
