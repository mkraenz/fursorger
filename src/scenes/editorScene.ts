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
export class EditorScene extends Scene {
    private containerArray!: GameObjects.Container[];
    private playerStockInfo!: GameObjects.Text;
    private travelPathLines!: GameObjects.Graphics;
    private selectedCities!: string[];
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
        this.selectedCities = [];
        this.graph = new Graph({ directed: false });
        this.addBackground();
        this.addSelectedCityText();
        this.addCityCreationButton();
    }

    public update() {
        this.updateSelectedCityText();
        this.updateEdges(this.containerArray);
    }

    private updateSelectedCityText() {
        const cityPair = this.selectedCities;
        if (cityPair.length >= 1) {
            this.firstCityText.setText(this.selectedCities[0]);
            if (cityPair.length === 2) {
                this.secondCityText.setText(this.selectedCities[1]);
            } else {
                this.secondCityText.setText("");
            }
        } else {
            this.firstCityText.setText("");
            this.secondCityText.setText("");
        }
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

    private creationButtonClicked() {
        const button = this.add.image(0, 0, "rectangleButton");
        const container = this.add.container(230, 170, [button]);
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
    }

    private defineContainerClickDown(container: GameObjects.Container) {
        container.on("pointerdown", () =>
            this.defineContainerClickUp(container)
        );
    }

    private defineContainerClickUp(container: GameObjects.Container) {
        // otherwise previous pointerup-listeners will stack
        container.off("pointerup");
        container.on("pointerup", () => {
            this.selectedCities.push(container.name);
            if (this.selectedCities.length === 2) {
                this.redrawEdges();
                this.selectedCities = [];
            }
        });
    }

    private defineContainerDrag(container: GameObjects.Container) {
        this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
            this.updateEdges(this.containerArray);
            // to prevent turn advance after dragging
            container.off("pointerup");
        });
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
        const cityPair = this.selectedCities;
        if (cityPair.length !== 2) {
            throw new Error(
                "selectedCities has wrong length for redrawEdges()"
            );
        }

        if (this.graph.hasEdge(cityPair[0], cityPair[1])) {
            this.graph.removeEdge(cityPair[0], cityPair[1]);
        } else {
            if (cityPair[0] === cityPair[1]) {
                this.selectedCities = [];
            } else {
                this.graph.setEdge(cityPair[0], cityPair[1]);
            }
        }
    }
}
