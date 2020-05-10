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
import { DottedLine } from "../components/DottedLine";
import { EditorButton } from "../components/EditorButton";
import { ExportLevelButton } from "../components/ExportLevelButton";
import { ImportLevelButton } from "../components/ImportLevelButton";
import { NextLevelButton } from "../components/NextLevelButton";
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
import { LevelExporter } from "../utils/LevelExporter";
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
        this.cameras.main.fadeIn(200);
        const currentLevel = levels[getLevel(this.registry)];
        const cityData = currentLevel.cities;
        const logicObjects = LogicBuilder.create(currentLevel);
        this.player = logicObjects.player;
        this.graph = logicObjects.graph;
        new BackgroundImage(this, currentLevel.background);
        this.addCities(cityData);
        this.addGui();
        this.input.keyboard.on("keydown-R", () => this.restart());
        this.addBalloons();
    }

    private addBalloons() {
        this.graph.edges().forEach(edge => {
            this.addBalloonForEdge(edge.v, edge.w);
            this.addLineForEdge(edge.v, edge.w);
        });
    }

    private addLineForEdge(startCityName: string, targetCityName: string) {
        const startCity = this.cities.find(city => city.name === startCityName);
        const targetCity = this.cities.find(
            city => city.name === targetCityName
        );
        new DottedLine(this, startCity, targetCity);
    }

    private addBalloonForEdge(startCityName: string, targetCityName: string) {
        const startCity = this.cities.find(city => city.name === startCityName);
        const targetCity = this.cities.find(
            city => city.name === targetCityName
        );
        new Balloon(this, startCity, targetCity);
    }

    private addGui() {
        new BuildFactoryButton(
            this,
            () => this.handleBuildButtonClicked(),
            () => this.player.factories
        );
        new TurnDisplay(this, () => this.player.turn);
        new PlayerStockDisplay(this, () => this.player.stock);
        new RestartButton(this, () => this.restart());
        new NextLevelButton(this, () => this.toggleLevel());
        const afterLevelParsedCb = (importedLevel: ILevel) => {
            levels.push(importedLevel);
            this.toggleLevel(levels.length - 1);
        };
        new ImportLevelButton(this, afterLevelParsedCb);
        new ExportLevelButton(
            this,
            new LevelExporter(
                () => levels[getLevel(this.registry)],
                () => getAllCities(this.graph),
                () => this.player
            )
        );
        new EditorButton(this, () => this.goto("EditorScene", EditorScene));
    }

    private handleBuildButtonClicked() {
        const locationName = this.player.locationName;
        getNode(this.graph, locationName).production++;
        this.player.factories--;
        if (this.isWin()) {
            this.win();
        }
    }

    private isWin() {
        const endangeredCities = getAllCities(this.graph).filter(
            city => city.production < 0
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
        const stockText = new CityStockDisplay(this, () => city.stock);
        const productionText = new CityProductionDisplay(
            this,
            () => city.production
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
                this.player.locationName,
                city.name
            );
            if (isValidMovement) {
                this.moveAndEndTurn(getNode(this.graph, city.name));
            }
        });
    }

    private moveAndEndTurn(location: ILocation) {
        this.player.move(location);
        this.cities.forEach(cont => {
            const consumCity = getNode(this.graph, cont.name);
            consumCity.consumeOrProduce();
            if (consumCity.stock < 0) {
                this.lose();
            }
        });
        this.setCityStates();
        this.cities.forEach(city => addProductionAnim(this, city));
    }

    private setCityStates() {
        this.cities.forEach(city => {
            const playerInNeighboringCity = this.graph.hasEdge(
                this.player.locationName,
                city.name
            );
            const playerInCity = city.name === this.player.locationName;
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
        this.goto("GoodEndScene", GoodEndScene);
    }

    private lose() {
        this.goto("badEndScene", BadEndScene);
    }

    private goto(key: string, sceneClass: new (name: string) => Scene) {
        this.scene.add(key, sceneClass, true);
        this.scene.remove("MainScene");
    }

    private toggleLevel(selectedLevel?: number) {
        const nextLevel = (getLevel(this.registry) + 1) % levels.length;
        setLevel(this.registry, selectedLevel || nextLevel);
        this.restart();
    }

    private restart() {
        this.cameras.main.once("camerafadeoutcomplete", () =>
            this.scene.restart()
        );
        this.cameras.main.fadeOut(100);
    }
}
