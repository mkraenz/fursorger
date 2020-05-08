import { saveAs } from "file-saver";
import { Graph } from "graphlib";
import { random } from "lodash";
import { GameObjects, Scene } from "phaser";
import {
    addProductionAnim,
    setProductionTextColor,
} from "../anims/addProductionAnim";
import { CustomTween, getBalloonTweenConfig } from "../anims/balloon-movements";
import { BuildFactoryButton } from "../components/BuildFactoryButton";
import { City } from "../components/City";
import { CityImage, CityImageState } from "../components/CityImage";
import { parseLevelFromJsonUpload } from "../components/parseLevelFromJsonUpload";
import { PlusMinusButton } from "../components/PlusMinusButton";
import { gameConfig } from "../game-config";
import { ICity } from "../levels/ILevel";
import { levels } from "../levels/index";
import { getAllCities, getNode } from "../logic/getNode";
import { ILocation } from "../logic/ILocation";
import { IPlayer } from "../logic/IPlayer";
import { LogicBuilder } from "../logic/LogicBuilder";
import { getLevel, setLevel } from "../registry/level";
import { TextConfig } from "../styles/Text";
import { BadEndScene } from "./badEndScene";
import { EditorScene } from "./editorScene";
import { GoodEndScene } from "./GoodEndScene";
const DEBUG = false;

const PLAYER_INFO_X = 50;
const textToIconOffset = -25;
const CITY_SPRITE_SCALE = 0.18;

export class MainScene extends Scene {
    private player!: IPlayer;
    private graph!: Graph;
    private cities!: City[];
    private playerStockInfo!: GameObjects.Text;
    private playerTurnInfo!: GameObjects.Text;
    private buildFactoryButton!: BuildFactoryButton;
    private debugText!: GameObjects.Text;

    constructor() {
        super({
            key: "MainScene",
        });
    }

    public create(): void {
        const currentLevel = levels[getLevel(this.registry)];
        const cityData = currentLevel.cities;
        const logicObjects = LogicBuilder.create(currentLevel);
        this.player = logicObjects.player;
        this.graph = logicObjects.graph;
        this.addBackground(currentLevel.background);
        this.addCities(cityData);
        this.addPlayerInfo();
        this.addLevelButton();
        this.addEditorButton();
        this.addImportLevelButton();
        this.addExportLevelButton();
        this.debugText = this.add
            .text(10, 10, "", TextConfig.debug)
            .setVisible(DEBUG);
        this.input.keyboard.on("keydown-R", () => this.restart());
        this.addBalloons();
    }

    public update() {
        this.playerStockInfo.setText(this.player.stock.toString());
        this.playerTurnInfo.setText(this.player.turn.toString());
        this.updateCityInfos();
        this.updateVisibilityTradeButtons();

        this.debugText.setText([
            `x: ${this.input.activePointer.x}`,
            `y: ${this.input.activePointer.y}`,
        ]);
    }

    private addBalloons() {
        this.graph
            .edges()
            .forEach(edge => this.addBalloonForEdge(edge.v, edge.w));
    }

    private addBalloonForEdge(startCityName: string, targetCityName: string) {
        const startCity = this.cities.find(
            container => container.name === startCityName
        );
        const targetCity = this.cities.find(
            container => container.name === targetCityName
        );
        const balloon = this.add
            .image(startCity.x, startCity.y, "balloon")
            .setScale(30 / 1600, 30 / 1600);
        const config = getBalloonTweenConfig(balloon, startCity, targetCity);

        const tween = this.tweens.add(config);
        (tween as CustomTween).movementPattern = random(5);
    }

    private updateVisibilityTradeButtons() {
        this.cities.forEach(city => {
            const playerIsInCity = city.name === this.player.getLocationName();
            city.plusTradeButton.setVisible(playerIsInCity);
            city.minusTradeButton.setVisible(playerIsInCity);
        });
    }

    private async handleFileSelect(event: any) {
        const importedLevel = await parseLevelFromJsonUpload(event);
        levels.push(importedLevel);
        this.toggleLevel(levels.length - 1);
    }

    private addLevelButton() {
        const button = this.add
            .text(50, 500, "Next Level", TextConfig.lg)
            .setInteractive();
        button.on("pointerup", () => {
            this.toggleLevel();
        });
    }

    private addEditorButton() {
        const button = this.add
            .text(202, 747, "Editor", TextConfig.sm)
            .setInteractive();
        button.on("pointerup", () => {
            this.scene.add("EditorScene", EditorScene, true);
            this.scene.remove(this);
        });
    }

    private addExportLevelButton() {
        const button = this.add
            .text(132, 747, "Export", TextConfig.sm)
            .setInteractive();
        const saveToFile = () => {
            const data = JSON.stringify(
                levels[getLevel(this.registry)],
                null,
                4
            );
            const blob = new Blob([data], {
                type: "application/json",
            });
            saveAs(blob, "level.json");
        };
        button.on("pointerup", saveToFile);
    }

    private addImportLevelButton() {
        const button = this.add
            .text(64, 747, "Import", TextConfig.sm)
            .setInteractive();
        const triggerFileUploadWindow = () => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("id", "files-input");
            input.setAttribute("name", "files[]");
            input.setAttribute("style", "opacity:0;");
            input.addEventListener("change", event =>
                this.handleFileSelect(event)
            );
            input.click();
            input.remove();
        };
        button.on("pointerup", triggerFileUploadWindow);
    }

    private updateCityInfos() {
        this.cities.forEach(city => {
            const stock = getNode(this.graph, city.name).economy.stock;
            city.stockText.setText(`${stock}`);
            const production = getNode(this.graph, city.name).economy
                .production;
            const productionText = city.productionText.setText(`${production}`);
            setProductionTextColor(production, productionText);
        });
    }

    private addPlayerInfo() {
        const IMAGE_TO_TEXT_OFFSET_Y = -15;
        const IMAGE_TO_TEXT_OFFSET_X = 40;
        const STOCK_Y = 200;
        const TURN_Y = STOCK_Y + 80;
        const FACTORY_Y = TURN_Y + 90;
        const RESTART_Y = FACTORY_Y + 90;
        this.add.image(PLAYER_INFO_X, STOCK_Y, "backpack").setScale(0.8);
        this.playerStockInfo = this.add.text(
            PLAYER_INFO_X + IMAGE_TO_TEXT_OFFSET_X,
            STOCK_Y + IMAGE_TO_TEXT_OFFSET_Y,
            "",
            TextConfig.lg
        );

        this.add.image(PLAYER_INFO_X, TURN_Y, "hourglass").setScale(0.8);
        this.playerTurnInfo = this.add.text(
            PLAYER_INFO_X + IMAGE_TO_TEXT_OFFSET_X,
            TURN_Y + IMAGE_TO_TEXT_OFFSET_Y,
            "",
            TextConfig.lg
        );

        this.buildFactoryButton = new BuildFactoryButton(
            this,
            PLAYER_INFO_X,
            FACTORY_Y
        );
        this.buildFactoryButton.on("pointerup", () =>
            this.handleBuildButtonClicked()
        );
        const restartIcon = this.add
            .image(PLAYER_INFO_X, RESTART_Y, "restart")
            .setInteractive();
        restartIcon.on("pointerup", () => this.restart());
    }

    private handleBuildButtonClicked() {
        const locationName = this.player.getLocationName();
        getNode(this.graph, locationName).economy.production++;
        this.player.factories--;
        this.buildFactoryButton.nextState(this.player.factories);
        if (this.isWin()) {
            this.scene.add("GoodEndScene", GoodEndScene, true, {
                x: 400,
                y: 300,
            });
            this.scene.remove("MainScene");
        }
    }

    private isWin() {
        const endangeredCities = getAllCities(this.graph).filter(
            city => city.economy.production < 0
        );
        return endangeredCities.length === 0;
    }

    private addBackground(key: string) {
        const background = this.add.image(0, 0, key).setOrigin(0);
        background.setDisplaySize(
            gameConfig.scale.width as number,
            gameConfig.scale.height as number
        );
    }

    private addCities(cities: ICity[]) {
        this.cities = [];
        cities.forEach(cityData => {
            const city = this.addCity(cityData);
            this.cities.push(city);
            this.setOnCityClick(city);
        });
        this.setCityStates();
    }

    private addCity({ name, x, y }: ICity) {
        const cityImage = new CityImage(this, 0, 0, name);
        const { stockText, prodText } = this.addEconomyInfo();

        const plus = new PlusMinusButton(this, "plus", () =>
            this.player.store()
        );
        const minus = new PlusMinusButton(this, "minus", () =>
            this.player.take()
        );
        return new City(this, x, y, name, {
            citySprite: cityImage,
            stockText,
            productionText: prodText,
            plusTradeButton: plus,
            minusTradeButton: minus,
        });
    }

    private setOnCityClick(city: City) {
        city.citySprite.on("pointerup", () => {
            const isValidMovement = this.graph.hasEdge(
                this.player.getLocationName(),
                city.name
            );
            if (isValidMovement) {
                this.moveAndEndTurn(getNode(this.graph, city.name));
            }
        });
    }

    private moveAndEndTurn(location: ILocation) {
        this.player.setLocation(location);
        this.cities.forEach(cont => {
            const consumCity = getNode(this.graph, cont.name);
            consumCity.consumeOrProduce();
            if (consumCity.economy.stock < 0) {
                this.badEndScene();
            }
        });
        this.setCityStates();
        this.cities.forEach(city => addProductionAnim(this, city));
        this.buildFactoryButton.nextState(this.player.factories);
    }

    private setCityStates() {
        this.cities.forEach(city => {
            city.citySprite.nextState(CityImageState.Base); // reset all
            if (this.graph.hasEdge(this.player.getLocationName(), city.name)) {
                city.citySprite.nextState(CityImageState.PlayerIsNeighboring);
            }
        });
    }

    private addEconomyInfo() {
        const stockText = this.add.text(
            -40,
            60 + textToIconOffset,
            "",
            TextConfig.lg
        );
        const prodText = this.add.text(
            0,
            60 + textToIconOffset,
            "",
            TextConfig.lg
        );
        return { stockText, prodText };
    }

    private badEndScene() {
        this.scene.add("badEndScene", BadEndScene, true, { x: 400, y: 300 });
        this.scene.remove("MainScene");
    }

    private toggleLevel(selectedLevel?: number) {
        const nextLevel = (getLevel(this.registry) + 1) % levels.length;
        setLevel(this.registry, selectedLevel || nextLevel);
        this.restart();
    }

    private restart() {
        this.scene.restart();
    }
}
