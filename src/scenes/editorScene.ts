import { saveAs } from "file-saver";
import { Graph } from "graphlib";
import { GameObjects, Scene } from "phaser";
import { gameConfig } from "../game-config";
import { MainScene } from "./mainScene";

const textStyle = {
    font: "48px Arial",
    fill: "#000000",
};
const nameTextStyle = {
    font: "40px Arial",
    fill: "#000000",
};
const textToIconOffset = -25;
export class EditorScene extends Scene {
    private containerArray!: GameObjects.Container[];
    private economyArray!: Array<{ stock: number; production: number }>;
    private backpackContainer!: GameObjects.Container;
    private backpack: number;
    private travelPathLines!: GameObjects.Graphics;
    private selectedContainer!: GameObjects.Container[];
    private graph!: Graph;

    constructor() {
        super({
            key: "EditorScene",
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
        this.load.image("play", "./assets/images/playArrow300x200.png");
        this.load.image("export", "./assets/images/export180x120.png");

        this.load.audio("background", "./assets/sounds/bgm.mp3");
    }

    public create(): void {
        // TODO #55 consider moving into title screen

        this.backpack = 0;

        const background = this.add.image(0, 0, "background2").setOrigin(0);
        background.setScale(
            (gameConfig.scale.width as number) / background.width,
            (gameConfig.scale.height as number) / background.height
        );
        this.travelPathLines = this.add.graphics({
            lineStyle: { width: 4, color: 0x0 },
        });
        this.containerArray = [];
        this.economyArray = [];
        this.selectedContainer = [];
        this.graph = new Graph({ directed: false });
        this.addCityCreationButton();
        this.addBackpackContainer();
        this.addExportLevelButton();
        this.addMainSceneButton();
        const textField = document.createElement("input");
        textField.type = "text";
        textField.id = "text";
        this.add.dom(100, 50, textField);
        textField.addEventListener("change", () => {
            if (this.selectedContainer.length === 1) {
                this.selectedContainer[0].name = textField.value;
            }
            textField.value = "";
        });
    }

    public update() {
        this.updateEdges();
        this.updateEconomyText();
        (this.backpackContainer.getAt(0) as GameObjects.Text).setText(
            this.backpack.toString()
        );
    }

    private addBackpackContainer() {
        const backpackX = 680;
        const backpackY = 40;
        const backpackTextY = backpackY - 25;
        const backpackTextX = backpackX + 40;
        const backpackImage = this.add.image(backpackX, backpackY, "backpack");
        const backpackText = this.add.text(
            backpackTextX,
            backpackTextY,
            "",
            textStyle
        );

        const backpackButtonY = backpackY + backpackImage.height / 2 - 25;
        const backpackButtonX = backpackX - 50;

        const backpackPlus = this.add
            .image(backpackButtonX, backpackButtonY - 20, "plus")
            .setScale(0.5)
            .setInteractive();
        const backpackMinus = this.add
            .image(backpackButtonX, backpackButtonY + 20, "minus")
            .setScale(0.5)
            .setInteractive();

        backpackPlus.on("pointerup", () => {
            this.backpack += 1;
        });
        backpackMinus.on("pointerup", () => {
            if (this.backpack > 0) {
                this.backpack -= 1;
            }
        });

        const backpackContainer = this.add.container(0, 0, [
            backpackText,
            backpackImage,
            backpackPlus,
            backpackMinus,
        ]);

        this.backpackContainer = backpackContainer;
    }

    private updateEdges() {
        this.travelPathLines.clear();
        this.travelPathLines = this.add.graphics({
            lineStyle: { width: 4, color: 0x0 },
        });
        this.graph.edges().forEach(edge => {
            const nodeV = this.containerArray.find(
                container => edge.v === container.name
            );
            const nodeW = this.containerArray.find(
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

    private updateEconomyText() {
        this.containerArray.forEach(container => {
            const economy = this.economyArray[
                this.containerArray.indexOf(container)
            ];
            (container.getAt(1) as GameObjects.Text).setText(
                economy.stock.toString()
            );
            (container.getAt(2) as GameObjects.Text).setText(
                economy.production.toString()
            );
        });
    }

    private addBackground() {
        this.add
            .image(0, 0, "background")
            .setOrigin(0)
            .setScale(
                (gameConfig.scale.width as number) / 500,
                (gameConfig.scale.height as number) / 300
            );
    }

    private creationButtonClicked() {
        const button = this.add.image(0, 0, "rectangleButton");
        const container = this.add.container(230, 170, [button]);
        this.addEconomy(container);
        // setSize() is crucial to avoid "gameObject.input is null"
        container.setSize(button.width, button.height);
        container.setInteractive();
        container.setName(this.containerArray.length.toString());
        container.setDepth(1);
        this.input.setDraggable(container);
        this.defineContainerDrag(container);
        this.defineContainerClickUp(container);
        this.defineContainerClickDown(container);
        this.graph.setNode(container.name);
        this.containerArray.push(container);
        this.economyArray.push({ stock: 0, production: 0 });
    }

    private setButtonVisible(isVisible: boolean) {
        const buttonArray = this.selectedContainer[0].getAll().slice(5, 9);
        buttonArray.forEach(button => {
            (button as GameObjects.Image).setVisible(isVisible);
        });
    }

    private defineContainerClickDown(container: GameObjects.Container) {
        container.on("pointerdown", () =>
            this.defineContainerClickUp(container)
        );
    }

    private setContainerButtonColor(
        container: GameObjects.Container,
        hex: number
    ) {
        (container.getAt(0) as GameObjects.Image).setTint(hex);
    }

    private resetContainerButtonColor(container: GameObjects.Container) {
        (container.getAt(0) as GameObjects.Image).clearTint();
    }

    private defineContainerClickUp(container: GameObjects.Container) {
        // otherwise previous pointerup-listeners will stack
        container.off("pointerup");
        container.on("pointerup", () => {
            this.selectedContainer.push(container);
            if (this.selectedContainer.length === 2) {
                this.resetContainerButtonColor(this.selectedContainer[0]);
                this.resetContainerButtonColor(this.selectedContainer[1]);
                this.setButtonVisible(false);
                this.redrawEdges();
                this.selectedContainer = [];
            } else {
                this.setContainerButtonColor(container, 0x44ff44);
                this.setButtonVisible(true);
            }
        });
    }

    private defineContainerDrag(container: GameObjects.Container) {
        this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
            this.updateEdges();
            // to prevent turn advance after dragging
            container.off("pointerup");
        });
    }

    private addContainerStock(
        container: GameObjects.Container,
        stockAdd: number
    ) {
        const index = this.containerArray.indexOf(container);
        this.economyArray[index].stock += stockAdd;
    }

    private addContainerProduction(
        container: GameObjects.Container,
        productionAdd: number
    ) {
        const index = this.containerArray.indexOf(container);
        this.economyArray[index].production += productionAdd;
    }

    private addCityCreationButton() {
        const creationButton = this.add
            .image(
                (gameConfig.scale.width as number) - 100,
                (gameConfig.scale.height as number) - 100,
                "plus"
            )
            .setInteractive();

        creationButton.on("pointerup", () => {
            this.creationButtonClicked();
        });
    }

    private redrawEdges() {
        const cityPair = this.selectedContainer;
        if (cityPair.length !== 2) {
            throw new Error(
                "selectedCities has wrong length for redrawEdges()"
            );
        }

        if (this.graph.hasEdge(cityPair[0].name, cityPair[1].name)) {
            this.graph.removeEdge(cityPair[0].name, cityPair[1].name);
        } else {
            if (cityPair[0] === cityPair[1]) {
                this.selectedContainer = [];
            } else {
                this.graph.setEdge(cityPair[0].name, cityPair[1].name);
            }
        }
    }

    private addEconomy(container: GameObjects.Container) {
        const midOfButton = container.width / 2;
        const imageX = midOfButton;
        const stockY = -60;
        const prodY = 60;
        const buttonX = midOfButton + 100;
        const stockButtonY = stockY;
        const prodButtonY = prodY;

        const stock = this.add.image(midOfButton, stockY, "stock");
        const stockText = this.add.text(
            midOfButton + 40,
            stockY + textToIconOffset,
            "",
            textStyle
        );
        const production = this.add.image(midOfButton, prodY, "production");
        const prodText = this.add.text(
            midOfButton + 40,
            prodY + textToIconOffset,
            "",
            textStyle
        );
        container.add([stockText, prodText, stock, production]);

        const plusStock = this.add
            .image(buttonX, stockButtonY - 20, "plus")
            .setScale(0.5)
            .setInteractive();
        plusStock.on("pointerup", () => {
            this.addContainerStock(container, 1);
        });
        plusStock.setVisible(false);

        const minusStock = this.add
            .image(buttonX, stockButtonY + 20, "minus")
            .setScale(0.5)
            .setInteractive();
        minusStock.on("pointerup", () => {
            this.addContainerStock(container, -1);
        });
        minusStock.setVisible(false);

        const plusProd = this.add
            .image(buttonX, prodButtonY - 20, "plus")
            .setScale(0.5)
            .setInteractive();
        plusProd.on("pointerup", () => {
            this.addContainerProduction(container, 1);
        });
        plusProd.setVisible(false);

        const minusProd = this.add
            .image(buttonX, prodButtonY + 20, "minus")
            .setScale(0.5)
            .setInteractive();

        minusProd.on("pointerup", () => {
            this.addContainerProduction(container, -1);
        });

        minusProd.setVisible(false);

        container.add([plusStock, minusStock, plusProd, minusProd]);
    }

    private generateLevel() {
        const cities = this.containerArray.map(container => {
            const index = this.containerArray.indexOf(container);
            return {
                name: container.name,
                stock: this.economyArray[index].stock,
                production: this.economyArray[index].production,
                x: container.x,
                y: container.y,
            };
        });

        const travelPaths = this.graph.edges().map(edge => {
            return { first: edge.v, second: edge.w };
        });

        return {
            cities,
            travelPaths,
            playerStock: this.backpack,
        };
    }

    private addExportLevelButton() {
        const button = this.add
            .image(60, 540, "export")
            .setInteractive()
            .setScale(100 / 180);
        const saveToFile = () => {
            const data = JSON.stringify(this.generateLevel(), null, 4);
            const blob = new Blob([data], {
                type: "application/json",
            });
            saveAs(blob, "level.json");
        };
        button.on("pointerup", saveToFile);
    }

    private addMainSceneButton() {
        const button = this.add
            .image(220, 540, "play")
            .setInteractive()
            .setScale(100 / 200);

        button.on("pointerup", () => {
            this.sound.stopAll();
            this.scene.add("mainScene", MainScene, true, { x: 400, y: 300 });
            this.scene.remove(this);
            const textField = document.getElementById("text");
            textField.remove();
        });
    }
}
