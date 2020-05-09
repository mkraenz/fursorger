import { GameObjects, Scene } from "phaser";
import { GrowShrinkAnimPlugin } from "../anims/GrowShrinkAnimPlugin";
import { ILevel } from "../levels/ILevel";
import { TextConfig } from "../styles/Text";

export class ImportLevelButton extends GameObjects.Text {
    constructor(
        scene: Scene,
        private afterLevelParsedCb: (importedLevel: ILevel) => void
    ) {
        super(scene, 35, 747, "Import", TextConfig.sm);
        scene.add.existing(this);
        this.setInteractive();

        this.on("pointerup", () => this.triggerFileUploadWindow());
        new GrowShrinkAnimPlugin(scene, this);
    }

    private triggerFileUploadWindow = () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("id", "files-input");
        input.setAttribute("name", "files[]");
        input.setAttribute("style", "opacity:0;");
        input.addEventListener("change", event => this.handleFileSelect(event));
        input.click();
        input.remove();
    };

    private async handleFileSelect(event) {
        const importedLevel = await parseLevelFromJsonUpload(event);
        this.afterLevelParsedCb(importedLevel);
    }
}

function parseLevelFromJsonUpload(event: any): Promise<ILevel> {
    return new Promise(resolve => {
        const files: any[] = event.target.files;
        const reader = new FileReader();
        reader.onload = file => {
            try {
                const json = JSON.parse(file.target.result as string);
                resolve(json);
            } catch (err) {
                alert(
                    `Error when trying to parse file as JSON. Original error: ${err.message}`
                );
            }
        };
        reader.readAsText(files[0]);
    });
}
