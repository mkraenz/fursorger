import { Graph } from "graphlib";
import { Scene } from "phaser";
import { gameConfig } from "../game-config";
import { IPlayer } from "./IPlayer";
import { LogicBuilder } from "./logicBuilder";

export class MainScene extends Scene {
    private player!: IPlayer;
    private graph!: Graph;

    constructor() {
        super({
            key: "MainScene",
        });
    }

    public preload(): void {
        this.load.image("buy", "./assets/images/buy.png");
        this.load.image("sell", "./assets/images/sell.png");
        this.load.image("background", "./assets/images/background500x300.png");
        this.load.audio("buy", "./assets/sounds/buy.wav");
        this.load.audio("sell", "./assets/sounds/sell.wav");
        this.load.audio("background", "./assets/sounds/bgm.mp3");
    }

    public create(): void {
        const logicObjects = LogicBuilder.create();
        this.player = logicObjects.player;
        this.graph = logicObjects.graph;
        this.addBackgroundMusic();
        this.addBackground();
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
