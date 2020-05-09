import { Graph } from "graphlib";
import { Scene } from "phaser";
import { addProductionAnim } from "../anims/addProductionAnim";
import { BackgroundImage } from "../components/BackgroundImage";
import { Balloon } from "../components/Balloon";
import { BuildFactoryButton } from "../components/BuildFactoryButton";
import { City, CityState } from "../components/City";
import { CityImage } from "../components/CityImage";
import { CityNameDisplay } from "../components/CityNameDisplay";
import { CityProductionDisplay } from "../components/CityProductionDisplay";
import { CityStockDisplay } from "../components/CityStockDisplay";
import { ExportLevelButton } from "../components/ExportLevelButton";
import { ImportLevelButton } from "../components/ImportLevelButton";
import { PlayerStockDisplay } from "../components/PlayerStockDisplay";
import { PlusMinusButton } from "../components/PlusMinusButton";
import { RestartButton } from "../components/RestartButton";
import { TurnDisplay } from "../components/TurnDisplay";
import { ICity, ILevel } from "../levels/ILevel";
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

export class MainScene extends Scene {
    private player!: IPlayer;
    private graph!: Graph;
    private cities!: City[];

    constructor() {
        super({ key: "MainScene" });
    }

    public create(): void {
        const currentLevel = levels[getLevel(this.registry)];
        const cityData = currentLevel.cities;
        const logicObjects = LogicBuilder.create(currentLevel);
        this.player = logicObjects.player;
        this.graph = logicObjects.graph;
        new BackgroundImage(this, currentLevel.background);
        this.addCities(cityData);
        this.addSidebar();
        this.addLevelButton();
        this.addEditorButton();
        this.addImportExportButtons();
        this.input.keyboard.on("keydown-R", () => this.restart());
        this.addBalloons();
    }

    private addImportExportButtons() {
        const afterLevelParsedCb = (importedLevel: ILevel) => {
            levels.push(importedLevel);
            this.toggleLevel(levels.length - 1);
        };
        new ImportLevelButton(this, afterLevelParsedCb);
        new ExportLevelButton(this, () => levels[getLevel(this.registry)]);
    }

    private addBalloons() {
        this.graph
            .edges()
            .forEach(edge => this.addBalloonForEdge(edge.v, edge.w));
    }

    private addBalloonForEdge(startCityName: string, targetCityName: string) {
        const startCity = this.cities.find(city => city.name === startCityName);
        const targetCity = this.cities.find(
            city => city.name === targetCityName
        );
        new Balloon(this, startCity, targetCity);
    }

    private addLevelButton() {
        const button = this.add
            .text(65, 520, "Next Level", TextConfig.lg)
            .setInteractive();
        button.on("pointerup", () => this.toggleLevel());
    }

    private addEditorButton() {
        const button = this.add
            .text(155, 747, "Editor", TextConfig.sm)
            .setInteractive();
        button.on("pointerup", () => {
            this.scene.add("EditorScene", EditorScene, true);
            this.scene.remove(this);
        });
    }

    private addSidebar() {
        new BuildFactoryButton(
            this,
            () => this.handleBuildButtonClicked(),
            () => this.player.factories
        );
        new TurnDisplay(this, () => this.player.turn);
        new PlayerStockDisplay(this, () => this.player.stock);
        new RestartButton(this, () => this.restart());
    }

    private handleBuildButtonClicked() {
        const locationName = this.player.getLocationName();
        getNode(this.graph, locationName).economy.production++;
        this.player.factories--;
        if (this.isWin()) {
            this.win();
        }
    }

    private isWin() {
        const endangeredCities = getAllCities(this.graph).filter(
            city => city.economy.production < 0
        );
        return endangeredCities.length === 0;
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
        const city = getNode(this.graph, name);
        const cityImage = new CityImage(this, 0, 0, name);
        const stockText = new CityStockDisplay(this, () => city.economy.stock);
        const productionText = new CityProductionDisplay(
            this,
            () => city.economy.production
        );
        const plusTradeButton = new PlusMinusButton(this, "plus", () =>
            this.player.store()
        );
        const minusTradeButton = new PlusMinusButton(this, "minus", () =>
            this.player.take()
        );
        const nameText = new CityNameDisplay(this, name);
        return new City(this, x, y, name, {
            citySprite: cityImage,
            stockText,
            productionText,
            plusTradeButton,
            minusTradeButton,
            nameText,
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
                this.lose();
            }
        });
        this.setCityStates();
        this.cities.forEach(city => addProductionAnim(this, city));
    }

    private setCityStates() {
        this.cities.forEach(city => {
            const playerInNeighboringCity = this.graph.hasEdge(
                this.player.getLocationName(),
                city.name
            );
            const playerInCity = city.name === this.player.getLocationName();
            if (playerInNeighboringCity) {
                city.nextState(CityState.PlayerIsNeighboring);
            } else if (playerInCity) {
                city.nextState(CityState.PlayerInCity);
            } else {
                city.nextState(CityState.Base);
            }
        });
    }

    private win() {
        this.scene.add("GoodEndScene", GoodEndScene, true);
        this.scene.remove("MainScene");
    }

    private lose() {
        this.scene.add("badEndScene", BadEndScene, true);
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
