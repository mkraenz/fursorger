import { Graph } from "graphlib";
import { GameObjects, Scene } from "phaser";
import { gameConfig } from "../game-config";
import { cityConfig } from "./City.config";
import { CityName } from "./CityName";
import { getNode } from "./getNode";
import { IPlayer } from "./IPlayer";
import { LogicBuilder } from "./logicBuilder";

const PLAYER_INFO_X = 680;

const textStyle = {
    font: "48px Arial",
    fill: "#000000",
};
export class MainScene extends Scene {
    private player!: IPlayer;
    private graph!: Graph;
    private containerArray!: GameObjects.Container[];
    private playerInfo!: GameObjects.Text;

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
        this.load.image("backpack", "./assets/images/backpack64x64.png");
        this.load.image("stock", "./assets/images/storage64x64.png");
        this.load.image("production", "./assets/images/factory64x64.png");
        this.load.image(
            "consumption",
            "./assets/images/decreasing-bars64x64.png"
        );
        this.load.image("plus", "./assets/images/plus64x64.png");
        this.load.image("minus", "./assets/images/minus64x64.png");
        this.load.audio("background", "./assets/sounds/bgm.mp3");
    }

    public create(): void {
        const logicObjects = LogicBuilder.create();
        this.player = logicObjects.player;
        this.graph = logicObjects.graph;
        this.addBackgroundMusic();
        this.addBackground();
        // draw edges first, so that cities are drawn on top
        this.drawEdges();
        this.addCities();
        this.addPlayerInfo();
    }

    public update() {
        this.playerInfo.setText(this.player.stock.toString());
        this.containerArray.forEach(container => {
            // getAt(1) returns the stock text
            (container.getAt(1) as GameObjects.Text).setText(
                getNode(
                    this.graph,
                    container.name as CityName
                ).economy.stock.toString()
            );
            // getAt(2) returns the production text
            (container.getAt(2) as GameObjects.Text).setText(
                getNode(
                    this.graph,
                    container.name as CityName
                ).economy.production.toString()
            );
            // getAt(3) returns the consumption text
            (container.getAt(3) as GameObjects.Text).setText(
                getNode(
                    this.graph,
                    container.name as CityName
                ).economy.consumption.toString()
            );
        });
    }

    private addPlayerInfo() {
        this.add.image(PLAYER_INFO_X, 40, "backpack");
        this.playerInfo = this.add.text(PLAYER_INFO_X + 40, 15, "", textStyle);
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

    private addCities() {
        this.containerArray = [];
        const textToIconOffset = -25;
        Object.values(CityName).forEach(xName => {
            const name = xName as CityName;
            const button = this.add.image(0, 0, name);
            const stock = this.add.image(0, -60, "stock");
            const stockText = this.add.text(
                40,
                -60 + textToIconOffset,
                "",
                textStyle
            );
            const production = this.add.image(0, 60, "production");
            const prodText = this.add.text(
                40,
                60 + textToIconOffset,
                "",
                textStyle
            );
            const consumption = this.add.image(130, 0, "consumption");
            const consText = this.add.text(
                170,
                0 + textToIconOffset,
                "",
                textStyle
            );
            const plus = this.add
                .image(-105, -30, "plus")
                .setScale(0.5)
                .setInteractive();
            plus.on("pointerup", () => {
                if (name === this.player.getLocationName()) {
                    this.player.store();
                }
            });
            const minus = this.add
                .image(-105, 30, "minus")
                .setScale(0.5)
                .setInteractive();

            const config = cityConfig[name];
            const container = this.add.container(config.x, config.y, [
                button,
                stockText,
                prodText,
                consText,
                stock,
                production,
                consumption,
                plus,
                minus,
            ]);
            container.setName(name);
            this.containerArray.push(container);
        });
        this.containerArray.forEach(container => {
            const index = this.containerArray.indexOf(container);
            container.setSize(170, 60);
            if (container.name === this.player.getLocationName()) {
                (container.getAt(0) as GameObjects.Image).setTint(0x44ff44);
            }
            container.setInteractive();
            container.on("pointerup", () => {
                if (
                    // no edges between city and itself
                    this.graph.hasEdge(
                        this.player.getLocationName(),
                        container.name
                    )
                ) {
                    this.player.setLocation(
                        getNode(this.graph, container.name as CityName)
                    );
                    (container.getAt(0) as GameObjects.Image).setTint(0x44ff44);
                    this.containerArray.forEach(cont => {
                        const consumCity = getNode(
                            this.graph,
                            cont.name as CityName
                        );
                        consumCity.consume();
                    });
                    this.containerArray.forEach((other, otherIndex) => {
                        if (!(index === otherIndex)) {
                            const otherImg = other.getAt(
                                0
                            ) as GameObjects.Image;
                            otherImg.clearTint();
                        }
                    });
                }
            });
        });
    }

    private drawEdges() {
        this.graph.edges().forEach(edge => {
            const nodeV = cityConfig[edge.v as CityName];
            const nodeW = cityConfig[edge.w as CityName];
            const line = new Phaser.Geom.Line(
                nodeV.x,
                nodeV.y,
                nodeW.x,
                nodeW.y
            );
            const graphics = this.add.graphics({
                lineStyle: { width: 4, color: 0x0 },
            });
            graphics.strokeLineShape(line);
        });
    }
}
