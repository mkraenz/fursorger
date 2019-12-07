import { Graph } from "graphlib";
import { GameObjects, Scene } from "phaser";
import { gameConfig } from "../game-config";
import { BadEndScene } from "./badEndScene";
import { getAllCities, getNode } from "./getNode";
import { GoodEndScene } from "./GoodEndScene";
import { ICity } from "./ILevel";
import { IPlayer } from "./IPlayer";
import { levelArray } from "./levels";
import { LogicBuilder } from "./logicBuilder";

const PLAYER_INFO_X = 680;
const CITY_NAME_X = -70;
const CITY_NAME_Y = -25;
const textToIconOffset = -25;

const textStyle = {
    font: "48px Arial",
    fill: "#000000",
};
const nameTextStyle = {
    font: "40px Arial",
    fill: "#000000",
};
export class MainScene extends Scene {
    private player!: IPlayer;
    private graph!: Graph;
    private containerArray!: GameObjects.Container[];
    private playerStockInfo!: GameObjects.Text;
    private playerTurnInfo!: GameObjects.Text;
    private buildFactoryButton!: GameObjects.Image;
    private level = 2;
    private travelPathLines!: GameObjects.Graphics;

    constructor() {
        super({
            key: "MainScene",
        });
    }

    public preload(): void {
        this.load.image(
            "rectangleButton",
            " ./assets/images/blank_rectangle60x160.png"
        );
        this.load.image("background", "./assets/images/background500x300.png");
        this.load.image("backpack", "./assets/images/backpack64x64.png");
        this.load.image("stock", "./assets/images/storage64x64.png");
        this.load.image(
            "production",
            "./assets/images/decreasing-bars64x64.png"
        );
        this.load.image("plus", "./assets/images/plus64x64.png");
        this.load.image("minus", "./assets/images/minus64x64.png");
        this.load.image("hourglass", "./assets/images/hourglass64x64.png");
        this.load.image(
            "buildFactory",
            "./assets/images/buildFactoryButton128x128.png"
        );

        this.load.audio("background", "./assets/sounds/bgm.mp3");
    }

    public create(): void {
        // TODO #55 consider moving into title screen
        document
            .getElementById("files-input")
            .addEventListener("change", event => this.handleFileSelect(event));

        const cityData = levelArray[this.level - 1].cities;
        this.travelPathLines = this.add.graphics({
            lineStyle: { width: 4, color: 0x0 },
        });
        const logicObjects = LogicBuilder.create(levelArray[this.level - 1]);
        this.player = logicObjects.player;
        this.graph = logicObjects.graph;
        this.addBackgroundMusic();
        this.addBackground();
        // draw edges first, so that cities are drawn on top
        this.drawEdges(cityData);
        this.addCities(cityData);
        this.addPlayerInfo();
        this.addLevelButton();
        this.addLoadLevelFromFileButton();
    }

    public update() {
        this.playerStockInfo.setText(this.player.stock.toString());
        this.playerTurnInfo.setText(this.player.turn.toString());
        this.updateBuildFactoryButton();
        this.updateCityInfos();
    }

    public defineContainerDrag(container: GameObjects.Container) {
        this.input.setDraggable(container);
        this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
            this.updateEdges(this.containerArray);
            // TODO: edges behind container
            // TODO: no turn advance when dragging
        });
    }

    private updateEdges(containerArray: GameObjects.Container[]) {
        this.travelPathLines.clear();
        this.travelPathLines = this.add.graphics({
            lineStyle: { width: 4, color: 0x0 },
        });
        this.graph.edges().forEach(edge => {
            const nodeV = containerArray.find(
                container => edge.v === container.name
            );
            const nodeW = containerArray.find(
                container => edge.w === container.name
            );
            const line = new Phaser.Geom.Line(
                nodeV.x,
                nodeV.y,
                nodeW.x,
                nodeW.y
            );
            this.travelPathLines.strokeLineShape(line);
        });
    }

    private handleFileSelect(event: any) {
        handleFileSelect(event, () => {
            this.toggleLevel(levelArray.length);
        });
    }

    private addLevelButton() {
        const button = this.add
            .text(50, 500, "Next Level", textStyle)
            .setInteractive();
        button.on("pointerup", () => {
            this.toggleLevel();
        });
    }

    private addLoadLevelFromFileButton() {
        const button = this.add
            .text(400, 500, "Load Level File", textStyle)
            .setInteractive();
        button.on("pointerup", () => {
            document.getElementById("files-input").click();
        });
    }

    private updateCityInfos() {
        this.containerArray.forEach(container => {
            // getAt(1) returns the stock text
            (container.getAt(1) as GameObjects.Text).setText(
                getNode(this.graph, container.name).economy.stock.toString()
            );
            // getAt(2) returns the production text
            (container.getAt(2) as GameObjects.Text).setText(
                getNode(
                    this.graph,
                    container.name
                ).economy.production.toString()
            );
        });
    }

    private updateBuildFactoryButton() {
        if (this.player.factories === 0) {
            this.buildFactoryButton.setAlpha(0.5).disableInteractive();
        } else {
            this.buildFactoryButton.clearAlpha().setInteractive();
        }
    }

    private addPlayerInfo() {
        const IMAGE_TO_TEXT_OFFSET_Y = -25;
        const IMAGE_TO_TEXT_OFFSET_X = 40;
        const STOCK_Y = 40;
        this.add.image(PLAYER_INFO_X, STOCK_Y, "backpack");
        this.playerStockInfo = this.add.text(
            PLAYER_INFO_X + IMAGE_TO_TEXT_OFFSET_X,
            STOCK_Y + IMAGE_TO_TEXT_OFFSET_Y,
            "",
            textStyle
        );

        const TURN_Y = 120;
        this.add.image(PLAYER_INFO_X, TURN_Y, "hourglass");
        this.playerTurnInfo = this.add.text(
            PLAYER_INFO_X + IMAGE_TO_TEXT_OFFSET_X,
            TURN_Y + IMAGE_TO_TEXT_OFFSET_Y,
            "",
            textStyle
        );

        this.buildFactoryButton = this.add
            .image(PLAYER_INFO_X, 220, "buildFactory")
            .setScale(0.5);
        this.buildFactoryButton.on("pointerup", () => {
            this.handleBuildButtonClicked();
        });
    }

    private handleBuildButtonClicked() {
        const locationName = this.player.getLocationName();
        getNode(this.graph, locationName).economy.production++;
        this.player.factories--;
        if (this.isWin()) {
            this.scene.add("GoodEndScene", GoodEndScene, true, {
                x: 400,
                y: 300,
            });
        }
    }

    private isWin() {
        const endangeredCities = getAllCities(this.graph).filter(
            city => city.economy.production < 0
        );
        return endangeredCities.length === 0;
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

    private addCities(cities: ICity[]) {
        this.containerArray = [];
        cities.forEach(city => {
            const name = city.name;
            const nameText = this.add.text(
                CITY_NAME_X,
                CITY_NAME_Y,
                name,
                nameTextStyle
            );
            const button = this.addFittingButton(nameText);
            const {
                stockText,
                prodText,
                stock,
                production,
            } = this.addEconomyInfo(nameText);
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
            minus.on("pointerup", () => {
                if (name === this.player.getLocationName()) {
                    this.player.take();
                }
            });

            const container = this.add.container(city.x, city.y, [
                button,
                stockText,
                prodText,
                stock,
                production,
                plus,
                minus,
                nameText,
            ]);
            container.setName(name);
            this.containerArray.push(container);
        });
        this.containerArray.forEach(container => {
            container.setSize(170, 60);
            if (container.name === this.player.getLocationName()) {
                (container.getAt(0) as GameObjects.Image).setTint(0x44ff44);
            }
            this.defineContainerClick(container);
            this.defineContainerDrag(container);
        });
    }

    private defineContainerClick(container: GameObjects.Container) {
        const index = this.containerArray.indexOf(container);
        container.setInteractive();
        container.on("pointerup", () => {
            if (
                // no edges between city and itself
                this.graph.hasEdge(
                    this.player.getLocationName(),
                    container.name
                )
            ) {
                this.player.setLocation(getNode(this.graph, container.name));
                (container.getAt(0) as GameObjects.Image).setTint(0x44ff44);
                this.containerArray.forEach(cont => {
                    const consumCity = getNode(this.graph, cont.name);
                    consumCity.economize();
                    if (consumCity.economy.stock < 0) {
                        this.endScene();
                    }
                });
                this.containerArray.forEach((other, otherIndex) => {
                    if (!(index === otherIndex)) {
                        const otherImg = other.getAt(0) as GameObjects.Image;
                        otherImg.clearTint();
                    }
                });
            }
        });
    }

    private addEconomyInfo(nameText: GameObjects.Text) {
        const midOfButton = nameText.width / 2 + nameText.x;
        const stock = this.add.image(midOfButton, -60, "stock");
        const stockText = this.add.text(
            midOfButton + 40,
            -60 + textToIconOffset,
            "",
            textStyle
        );
        const production = this.add.image(midOfButton, 60, "production");
        const prodText = this.add.text(
            midOfButton + 40,
            60 + textToIconOffset,
            "",
            textStyle
        );
        return { stockText, prodText, stock, production };
    }

    private addFittingButton(nameText: GameObjects.Text) {
        const button = this.add.image(0, 0, "rectangleButton");
        button.scaleX = (nameText.width + 20) / 160;
        button.x += (nameText.width - button.width) / 2 + 10;
        return button;
    }

    private drawEdges(cities: ICity[]) {
        this.travelPathLines = this.add.graphics({
            lineStyle: { width: 4, color: 0x0 },
        });
        this.graph.edges().forEach(edge => {
            const nodeV = cities.find(city => edge.v === city.name);
            const nodeW = cities.find(city => edge.w === city.name);
            const line = new Phaser.Geom.Line(
                nodeV.x,
                nodeV.y,
                nodeW.x,
                nodeW.y
            );
            this.travelPathLines.strokeLineShape(line);
        });
    }

    private endScene() {
        this.scene.add("badEndScene", BadEndScene, true, { x: 400, y: 300 });
    }

    private toggleLevel(selectedLevel?: number) {
        this.level = selectedLevel || (this.level % levelArray.length) + 1;
        this.scene.restart();
    }
}

function handleFileSelect(event: any, cb: () => void) {
    const files = event.target.files; // FileList object
    const reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = file => {
        try {
            const json = JSON.parse(file.target.result as string);
            // tslint:disable-next-line: no-console
            console.log(json);
            // TODO #55 maybe not ideal to modify the levelArray from unintuitive, hidden position in code
            levelArray.push(json);
            cb();
        } catch (err) {
            alert(
                `Error when trying to parse file as JSON. Original error: ${err.message}`
            );
        }
    };
    reader.readAsText(files[0]);
}
