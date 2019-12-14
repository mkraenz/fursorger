// import { saveAs } from "file-saver";
import { Graph } from "graphlib";
import { random } from "lodash";
import { GameObjects, Scene } from "phaser";
import {
    addProductionAnim,
    setProductionTextColor,
} from "../anims/addProductionAnim";
import { CustomTween, getBalloonTweenConfig } from "../anims/balloon-movements";
import { getBuildButtonTweenConfig } from "../anims/build-button-tween-config";
import { getTweenConfig as getCityTweenConfig } from "../anims/city-tween-config";
import { getPlusMinusButtonTweenConfig } from "../anims/plus-minus-tween-config";
import { gameConfig } from "../game-config";
import { ICity } from "../levels/ILevel";
import { levels } from "../levels/index";
import { getAllCities, getNode } from "../logic/getNode";
import { IPlayer } from "../logic/IPlayer";
import { LogicBuilder } from "../logic/LogicBuilder";
import { getLevel, setLevel } from "../registry/level";
import { TextConfig } from "../styles/Text";
import { BadEndScene } from "./badEndScene";
import { GoodEndScene } from "./GoodEndScene";
const DEBUG = false;

const PLAYER_INFO_X = 50;
const textToIconOffset = -25;
const CITY_SPRITE_SCALE = 0.18;

export class MainScene extends Scene {
    private player!: IPlayer;
    private graph!: Graph;
    private containers!: GameObjects.Container[];
    private playerStockInfo!: GameObjects.Text;
    private playerTurnInfo!: GameObjects.Text;
    private buildFactoryButton!: GameObjects.Image;
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
        this.addBackgroundMusic();
        this.addBackground(currentLevel.background);
        this.addCities(cityData);
        this.addPlayerInfo();
        this.addLevelButton();
        this.addImportLevelButton();
        this.addExportLevelButton();
        this.debugText = this.add
            .text(10, 10, "", TextConfig.debug)
            .setVisible(DEBUG);
        this.input.keyboard.on("keydown-R", () => this.restart());

        // initialUpdate
        this.updateBuildFactoryButton();
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

    private addBalloonForEdge(firstCityName: string, secondCityName: string) {
        const firstContainer = this.containers.find(
            container => container.name === firstCityName
        );
        const secondContainer = this.containers.find(
            container => container.name === secondCityName
        );
        const balloon = this.add
            .image(firstContainer.x, firstContainer.y, "balloon")
            .setScale(30 / 1600, 30 / 1600);
        const config = getBalloonTweenConfig(
            balloon,
            firstContainer.x,
            secondContainer.x,
            firstContainer.y,
            secondContainer.y
        );

        const tween = this.tweens.add(config);
        (tween as CustomTween).movementPattern = random(5);
    }

    private updateVisibilityTradeButtons() {
        this.containers.forEach(container => {
            (container.getAt(3) as GameObjects.Image).setVisible(
                container.name === this.player.getLocationName()
            );
            (container.getAt(4) as GameObjects.Image).setVisible(
                container.name === this.player.getLocationName()
            );
        });
    }

    private handleFileSelect(event: any) {
        handleFileSelect(event, () => {
            this.toggleLevel(levels.length - 1);
        });
    }

    private addLevelButton() {
        const button = this.add
            .text(50, 500, "Next Level", TextConfig.lg)
            .setInteractive();
        button.on("pointerup", () => {
            this.toggleLevel();
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
            // saveAs(blob, "level.json");
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
        this.containers.forEach(container => {
            // getAt(1) returns the stock text
            (container.getAt(1) as GameObjects.Text).setText(
                getNode(this.graph, container.name).economy.stock.toString()
            );
            const production = getNode(this.graph, container.name).economy
                .production;
            // getAt(2) returns the production text
            const productionText = (container.getAt(
                2
            ) as GameObjects.Text).setText(production.toString());
            setProductionTextColor(production, productionText);
        });
    }

    private updateBuildFactoryButton() {
        if (this.player.factories === 0) {
            this.buildFactoryButton.setAlpha(0.5).disableInteractive();
            this.tweens
                .getTweensOf(this.buildFactoryButton)
                .forEach(tween => tween.stop(0));
        } else {
            this.buildFactoryButton.clearAlpha().setInteractive();
            this.add.tween(getBuildButtonTweenConfig(this.buildFactoryButton));
        }
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

        this.buildFactoryButton = this.add
            .image(PLAYER_INFO_X, FACTORY_Y, "buildFactory")
            .setScale(0.5);
        this.buildFactoryButton.on("pointerup", () => {
            this.handleBuildButtonClicked();
        });
        const restartIcon = this.add
            .image(PLAYER_INFO_X, RESTART_Y, "restart")
            .setInteractive();
        restartIcon.on("pointerup", () => this.restart());
    }

    private handleBuildButtonClicked() {
        const locationName = this.player.getLocationName();
        getNode(this.graph, locationName).economy.production++;
        this.player.factories--;
        this.updateBuildFactoryButton();
        if (this.isWin()) {
            this.sound.stopAll();
            this.scene.add("GoodEndScene", GoodEndScene, true, {
                x: 400,
                y: 300,
            });
            this.scene.remove(this);
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

    private addBackground(key: string) {
        const background = this.add.image(0, 0, key).setOrigin(0);

        background.setScale(
            (gameConfig.scale.width as number) / background.width,
            (gameConfig.scale.height as number) / background.height
        );
    }

    private addCities(cities: ICity[]) {
        this.containers = [];
        cities.forEach(city => {
            const name = city.name;
            const button = this.add
                .image(0, 0, "city")
                .setScale(CITY_SPRITE_SCALE);
            const { stockText, prodText } = this.addEconomyInfo();

            const plus = this.addPlus();
            const minus = this.addMinus();

            const container = this.add.container(city.x, city.y, [
                button,
                stockText,
                prodText,
                plus,
                minus,
            ]);
            container.setDepth(1);
            container.setName(name);
            this.containers.push(container);
        });
        this.containers.forEach(container => {
            container.setSize(170, 60);
            if (
                this.graph.hasEdge(
                    this.player.getLocationName(),
                    container.name
                )
            ) {
                this.tweens.add(
                    getCityTweenConfig(container.getAt(0) as GameObjects.Image)
                );
            }
            this.defineContainerClick(container);
        });
    }

    private addPlus() {
        const plus = this.add
            .image(-60, -30, "plus")
            .setScale(0.5)
            .setInteractive();
        plus.on("pointerup", () => {
            this.player.store();
        });
        plus.on("pointerover", () => {
            this.tweens.add(getPlusMinusButtonTweenConfig(plus));
        });
        plus.on("pointerout", () => {
            this.tweens.getTweensOf(plus).forEach(x => {
                x.stop(0);
            });
        });
        return plus;
    }

    private addMinus() {
        const minus = this.add
            .image(-60, 30, "minus")
            .setScale(0.5)
            .setInteractive();
        minus.on("pointerup", () => {
            this.player.take();
        });
        minus.on("pointerover", () => {
            this.tweens.add(getPlusMinusButtonTweenConfig(minus));
        });
        minus.on("pointerout", () => {
            this.tweens.getTweensOf(minus).forEach(x => {
                x.stop(0);
            });
        });
        return minus;
    }

    private defineContainerClick(container: GameObjects.Container) {
        container.setInteractive();
        container.on("pointerup", () => {
            if (
                // move player
                this.graph.hasEdge(
                    this.player.getLocationName(),
                    container.name
                )
            ) {
                this.player.setLocation(getNode(this.graph, container.name));
                this.containers.forEach(cont => {
                    const consumCity = getNode(this.graph, cont.name);
                    consumCity.economize();
                    if (consumCity.economy.stock < 0) {
                        this.badEndScene();
                    }
                });

                // stop bouncing neighboring cities
                this.tweens
                    .getTweensOf(this.containers.map(cont => cont.getAt(0)))
                    .forEach(tween => {
                        tween.stop(0);
                    });
                this.containers.forEach(cont => {
                    addProductionAnim(this, cont);

                    if (
                        this.graph.hasEdge(
                            this.player.getLocationName(),
                            cont.name
                        )
                    ) {
                        this.tweens.add(
                            getCityTweenConfig(cont.getAt(
                                0
                            ) as GameObjects.Image)
                        );
                    }
                });
                this.updateBuildFactoryButton();
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
        this.sound.stopAll();
        this.scene.add("badEndScene", BadEndScene, true, { x: 400, y: 300 });
        this.scene.remove(this);
    }

    private toggleLevel(selectedLevel?: number) {
        const nextLevel = (getLevel(this.registry) + 1) % levels.length;
        setLevel(this.registry, selectedLevel || nextLevel);
        this.restart();
    }

    private restart() {
        this.sound.stopAll();
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
            levels.push(json);
            cb();
        } catch (err) {
            alert(
                `Error when trying to parse file as JSON. Original error: ${err.message}`
            );
        }
    };
    reader.readAsText(files[0]);
}
