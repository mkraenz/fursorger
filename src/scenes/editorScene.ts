import { Graph } from "graphlib";
import { GameObjects, Scene } from "phaser";
import { gameConfig } from "../game-config";

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
    private playerStockInfo!: GameObjects.Text;
    private travelPathLines!: GameObjects.Graphics;
    private selectedContainer!: GameObjects.Container[];
    private firstCityText!: GameObjects.Text;
    private secondCityText!: GameObjects.Text;
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

        this.load.audio("background", "./assets/sounds/bgm.mp3");
    }

    public create(): void {
        // TODO #55 consider moving into title screen

        this.travelPathLines = this.add.graphics({
            lineStyle: { width: 4, color: 0x0 },
        });
        this.containerArray = [];
        this.economyArray = [];
        this.selectedContainer = [];
        this.graph = new Graph({ directed: false });
        this.addBackground();
        this.addSelectedCityText();
        this.addCityCreationButton();
        this.addEconomyButtons();
    }

    public update() {
        this.updateSelectedCityText();
        this.updateEdges();
        this.updateEconomyText();
    }

    private updateSelectedCityText() {
        const cityPair = this.selectedContainer;
        if (cityPair.length >= 1) {
            this.firstCityText.setText(this.selectedContainer[0].name);
            if (cityPair.length === 2) {
                this.secondCityText.setText(this.selectedContainer[1].name);
            } else {
                this.secondCityText.setText("");
            }
        } else {
            this.firstCityText.setText("");
            this.secondCityText.setText("");
        }
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
                (gameConfig.width as number) / 500,
                (gameConfig.height as number) / 300
            );
    }

    private addSelectedCityText() {
        this.firstCityText = this.add.text(300, 80, "bla", textStyle);
        this.secondCityText = this.add.text(300, 160, "bla", textStyle);
    }

    private addEconomyButtons() {
        const plusStock = this.add
            .image(20, 20, "plus")
            .setScale(0.5)
            .setInteractive();
        plusStock.on("pointerup", () => {
            this.addContainerStock(this.selectedContainer[0], 1);
        });

        const minusStock = this.add
            .image(20, 60, "minus")
            .setScale(0.5)
            .setInteractive();

        minusStock.on("pointerup", () => {
            this.addContainerStock(this.selectedContainer[0], -1);
        });

        const plusProd = this.add
            .image(20, 100, "plus")
            .setScale(0.5)
            .setInteractive();

        plusProd.on("pointerup", () => {
            this.addContainerProduction(this.selectedContainer[0], 1);
        });

        const minusProd = this.add
            .image(20, 140, "minus")
            .setScale(0.5)
            .setInteractive();

        minusProd.on("pointerup", () => {
            this.addContainerProduction(this.selectedContainer[0], -1);
        });
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
                this.redrawEdges();
                this.selectedContainer = [];
            } else {
                this.setContainerButtonColor(container, 0x44ff44);
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
                (gameConfig.width as number) - 100,
                (gameConfig.height as number) - 100,
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
        const midOfButton = container.width / 2 + container.x;
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
        container.add([stockText, prodText, stock, production]);
    }
}
