import { Graph } from "graphlib";
import { Scene } from "phaser";
import { gameConfig } from "../game-config";
import { CityName } from "./CityName";
import { IPlayer } from "./IPlayer";
import { LogicBuilder } from "./logicBuilder";

export class MainScene extends Scene {
    private player!: IPlayer;
    private graph!: Graph;
    private info!: any;

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
        const bg = this.add.image(0, 0, "sell");

        const container = this.add.container(40, 30, [bg]);

        container.setInteractive(
            new Phaser.Geom.Circle(0, 0, 90),
            Phaser.Geom.Circle.Contains
        );

        container.once("pointerup", () => {
            this.player.setLocation(CityName.Athens);
        });
    }

    public update() {
        this.player.getLocation();
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
