import { Graph } from "graphlib";
import { GameObjects, Scene } from "phaser";
import { gameConfig } from "../game-config";
import { CityName } from "./CityName";
import { getNode } from "./getNode";
import { IPlayer } from "./IPlayer";
import { LogicBuilder } from "./logicBuilder";

export class MainScene extends Scene {
    private player!: IPlayer;
    private graph!: Graph;
    private locationText!: GameObjects.Text;
    private containerArray!: GameObjects.Container[];

    constructor() {
        super({
            key: "MainScene",
        });
    }

    public preload(): void {
        this.load.image("Athens", "./assets/images/athens3.png");
        this.load.image("Bern", "./assets/images/bern3.png");
        this.load.image("Cairo", "./assets/images/cairo3.png");
        this.load.image("background", "./assets/images/background500x300.png");
        this.load.audio("background", "./assets/sounds/bgm.mp3");
    }

    public create(): void {
        const logicObjects = LogicBuilder.create();
        this.player = logicObjects.player;
        this.graph = logicObjects.graph;
        this.addBackgroundMusic();
        this.addBackground();
        this.addContainerArray();

        this.locationText = this.add.text(
            300,
            300,
            this.player.getLocationName(),
            {
                font: "48px Arial",
                fill: "#000000",
            }
        );
    }

    public update() {
        this.locationText.setText(this.player.getLocationName());
    }

    private addContainerArray() {
        this.containerArray = [];
        let count = 0;
        Object.values(CityName).forEach(name => {
            const cityButton = this.add.image(0, 0, name);
            const container = this.add.container(100, 40 + count * 70, [
                cityButton,
            ]);
            container.setName(name);
            this.containerArray.push(container);
            count = count + 1;
        });
        this.containerArray.forEach(container => {
            container.setSize(170, 60);
            if (container.name === this.player.getLocationName()) {
                container.setAlpha(0.5);
            }
            container.setInteractive();
            container.on("pointerup", () => {
                if (
                    this.graph.hasEdge(
                        this.player.getLocationName(),
                        container.name
                    )
                ) {
                    this.player.setLocation(
                        getNode(this.graph, container.name as CityName)
                    );
                    container.setAlpha(0.5);

                    this.containerArray.forEach(other => {
                        if (!(other === container)) {
                            other.clearAlpha();
                        }
                    });
                }
            });
        });
    }

    private addBackgroundMusic() {
        this.sound.add("background").play("", { loop: true });
    }

    private addBackground() {
        this.add
            .image(0, 0, "background")
            .setOrigin(0)
            .setScale(
                (gameConfig.width as number) / 500,
                (gameConfig.height as number) / 300
            );
    }
}
