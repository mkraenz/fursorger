import { saveAs } from 'file-saver';
import { GameObjects, Scene } from 'phaser';
import { BackgroundImage } from '../components/BackgroundImage';
import { BackpackContainer } from '../components/BackPackContainer';
import { BlancLevelButton } from '../components/BlancLevelButton';
import { CityContainer, IEconomyHandlers } from '../components/CityContainer';
import { DeleteCityButton } from '../components/DeleteCityButton';
import { DownloadButton } from '../components/DownloadButton';
import { PlayMyMapButton } from '../components/PlayMyMapButton';
import { IPricingHandler, ShopContainer } from '../components/ShopContainer';
import { defaultLevel } from '../levels/defaultLevel';
import { ICity, ILevel, IShop } from '../levels/ILevel';
import { Color, toHex } from '../styles/Color';
import { MainScene } from './mainScene';

interface NameHolder {
    name: string;
}
const STORED_LEVEL_KEY = 'STORE_EDITOR';

// TODO: make this depending to screen size
const DEFAULT_START_ICON_X = 300;
const DEFAULT_START_ICON_Y = 400;
export class EditorScene extends Scene {
    private cities!: CityContainer[];
    private shops!: ShopContainer[];
    private travelPathLines!: GameObjects.Graphics;
    private startIcon!: GameObjects.Image;
    private noStartIconDrag!: boolean;

    // TODO: Orientate on components from file for container extraction and free them of this.level.city..., instead write them like components from component fiel...
    private level!: ILevel;

    constructor() {
        super({
            key: 'EditorScene',
        });
    }

    public create(): void {
        // TODO #267 this.level = JSON.parse(localStorage.getItem(..) || this.level; // etc
        new BackgroundImage(this, this.level.background);
        this.travelPathLines = this.add.graphics({
            lineStyle: { width: 4, color: toHex(Color.Black) },
        });
        this.cities = [];
        this.level.cities.forEach((city) => {
            this.addNewCityContainer(false, city);
        });
        this.shops = [];
        if (this.level.shops) {
            this.level.shops.forEach((shop) => {
                this.addNewShopContainer(false, shop);
            });
        }
        this.noStartIconDrag = true;
        this.addStartIcon();
        this.addCityCreationButton();
        this.addShopCreationButton();
        this.addBackpackContainer();
        this.addExportLevelButton();
        this.addBlankLevelButton();
        this.addDeleteCityButton();
        this.addMainSceneButton();
        const textField = document.createElement('input');
        textField.type = 'text';
        textField.id = 'text';
        this.add.dom(100, 50, textField);
        textField.addEventListener('change', () => {
            const focusedCity = this.getActivatedBuildings()[0];
            // TODO: Add user notification for case that second condition is not fulfilled!
            if (focusedCity && this.noCityHasThisName(textField.value)) {
                const oldContainerName = focusedCity.name;
                focusedCity.setName(textField.value);
                this.adjustLevelToNameChange(oldContainerName, textField.value);
            }
            textField.value = '';
        });
    }
    addShopCreationButton() {
        const creationButton = this.add
            .image(this.scale.width - 100, this.scale.height - 170, 'plus')
            .setInteractive();

        creationButton.on('pointerup', () => {
            this.createShopButtonClicked();
        });
    }
    createShopButtonClicked() {
        this.addNewShopContainer(true);
    }

    public init(): void {
        try {
            const storedLevelJSON = localStorage.getItem(STORED_LEVEL_KEY);
            if (storedLevelJSON !== null) {
                this.level = JSON.parse(storedLevelJSON);
            } else {
                this.level = defaultLevel;
            }
        } catch (error) {
            // tslint:disable-next-line: no-console
        }
    }

    private buildings() {
        const logic = [...this.level.cities, ...(this.level.shops || [])];
        const display = [...this.cities, ...this.shops];
        return {
            logic,
            display,
        };
    }

    public adjustLevelToNameChange(oldName: string, newName: string) {
        this.level.travelPaths.forEach((path) => {
            if (path.first === oldName) {
                path.first = newName;
            }
            if (path.second === oldName) {
                path.second = newName;
            }
        });
        this.buildings().logic.forEach((building) => {
            if (building.name === oldName) {
                building.name = newName;
            }
        });
        if (this.level.player.location === oldName) {
            this.level.player.location = newName;
        }
    }

    public update() {
        this.updateEdgeSlopes();
        this.updateEdgeSetting();
        this.cities.forEach((city) => city.update());
        this.shops.forEach((shop) => shop.update());
        if (this.noStartIconDrag) {
            this.moveStartIconToCity(this.level.player.location);
        }
    }

    private updateEdgeSetting() {
        const activatedBuildings = this.getActivatedBuildings();
        if (activatedBuildings.length === 2) {
            activatedBuildings[0].deactivate();
            activatedBuildings[1].deactivate();
            this.redrawEdgesAfterContainerClick({
                container: activatedBuildings[0],
                otherContainer: activatedBuildings[1],
            });
        }
    }

    private noCityHasThisName(name: string) {
        return !this.level.cities.some((city) => city.name === name);
    }

    private getActivatedBuildings() {
        return this.buildings().display.filter((building) =>
            building.isChosen()
        );
    }

    private addStartIcon() {
        this.startIcon = this.add
            .image(550, 360, 'startCityArrow')
            .setInteractive();
        this.startIcon.setScale(0.3, 0.3);
        this.input.setDraggable(this.startIcon);
        this.defineStartIconEvents();
    }

    private defineStartIconEvents() {
        this.startIcon.on(
            'drag',
            (_: unknown, dragX: number, dragY: number) => {
                this.startIcon.x = dragX;
                this.startIcon.y = dragY;
            }
        );
        this.startIcon.on('pointerdown', () => {
            this.noStartIconDrag = false;
            this.startIcon.once('pointerup', () => {
                this.updateStartIconPosition();
                this.noStartIconDrag = true;
            });
        });
    }

    private updateStartIconPosition() {
        this.buildings().display.forEach((container) => {
            // adjust to size of button which will change size
            const button = container.getAt(0) as GameObjects.Image;
            const width = button.width * button.scaleX;
            const height = button.height * button.scaleY;
            if (
                Math.abs(container.x - this.getStartIconPoint().x) <
                    width / 2 &&
                Math.abs(container.y - this.getStartIconPoint().y) < height / 2
            ) {
                this.level.player.location = container.name;
                this.moveStartIconToCity(container.name);
            }
        });
    }

    private moveStartIconToCity(startCityName: string) {
        const startContainer = this.buildings().display.find(
            (container) => container.name === startCityName
        );
        if (startContainer) {
            this.startIcon.x = startContainer.x - 50;
            this.startIcon.y = startContainer.y - 80;
        } else {
            this.startIcon.x = DEFAULT_START_ICON_X;
            this.startIcon.y = DEFAULT_START_ICON_Y;
        }
    }

    private getStartIconPoint() {
        return {
            x: this.startIcon.x,
            y: this.startIcon.y + 162 * this.startIcon.scaleY,
        };
    }

    private addBackpackContainer() {
        new BackpackContainer(
            this,
            0,
            0,
            () => {
                this.level.player.stock--;
            },
            () => {
                this.level.player.stock++;
            }
        );
    }

    private updateEdgeSlopes() {
        this.travelPathLines.clear();
        this.travelPathLines = this.add.graphics({
            lineStyle: { width: 4, color: 0x0 },
        });
        this.level.travelPaths.forEach((path) => {
            const nodeV = this.buildings().display.find(
                (container) => path.first === container.name
            );
            const nodeW = this.buildings().display.find(
                (container) => path.second === container.name
            );
            if (!nodeV || !nodeW)
                throw new Error(
                    `Node not found for path ${path.first} to ${path.second}`
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

    private getDefaultName(isFor: 'City' | 'Shop') {
        const buildings =
            isFor === 'City' ? this.level.cities : this.level.shops || [];
        const numberOfTargets = buildings.length;
        const possibleNames = new Array(numberOfTargets + 1)
            .fill(1)
            .map((_, index) => this.concateName(isFor, index));

        const nameIsUnused = (name: string) =>
            (buildings as NameHolder[]).every(
                (building) => building.name !== name
            );

        return possibleNames.find((name) => nameIsUnused(name))!;
    }

    private concateName(isFor: 'City' | 'Shop', index: number) {
        return isFor + ' ' + index;
    }

    private addNewCityContainer(
        addToLevelCities: boolean,
        city: ICity = {
            production: -1,
            stock: 5,
            name: this.getDefaultName('City'),
            x: 300,
            y: 400,
        }
    ) {
        if (addToLevelCities) {
            this.level.cities.push(city);
        }
        const cityInList = this.level.cities.find(
            (container) => city.name === container.name
        )!;
        const newEconomy = { stock: city.stock, production: city.production };
        const stockAdd = (summand: number) => {
            cityInList.stock += summand;
        };
        const productionAdd = (summand: number) => {
            cityInList.production += summand;
        };
        const onTranslation = (x: number, y: number) => {
            cityInList.x = x;
            cityInList.y = y;
        };
        this.cities.push(
            new CityContainer(
                this,
                city.x,
                city.y,
                city.name,
                newEconomy,
                {
                    addToProduction: productionAdd,
                    addToStock: stockAdd,
                } as IEconomyHandlers,
                onTranslation
            )
        );
    }
    private addNewShopContainer(
        addToLevel: boolean,
        shop: IShop = {
            x: 300,
            y: 400,
            name: this.getDefaultName('Shop'),
            price: 1,
        }
    ) {
        if (addToLevel) {
            this.level.shops = (this.level.shops || []).concat(shop);
        }
        if (!this.level.shops) {
            throw new Error(
                'Shops are undefined. Do you need to add the shop?'
            );
        }
        const shopInList = this.level.shops.find(
            (container) => shop.name === container.name
        )!;
        const onTranslation = (x: number, y: number) => {
            shopInList.x = x;
            shopInList.y = y;
        };
        this.shops.push(
            new ShopContainer(
                this,
                shop.x,
                shop.y,
                shop.name,
                shop.price,
                {
                    addToPrice: () => {},
                } as IPricingHandler,
                onTranslation
            )
        );
    }

    private createCityButtonClicked() {
        this.addNewCityContainer(true);
    }

    private addCityCreationButton() {
        const creationButton = this.add
            .image(this.scale.width - 100, this.scale.height - 100, 'plus')
            .setInteractive();

        creationButton.on('pointerup', () => {
            this.createCityButtonClicked();
        });
    }

    private redrawEdgesAfterContainerClick(selected: {
        container: CityContainer | ShopContainer;
        otherContainer: CityContainer | ShopContainer;
    }) {
        const firstName = selected.container.name;
        const secondName = selected.otherContainer.name;

        if (!this.deletePath(firstName, secondName)) {
            this.level.travelPaths.push({
                first: firstName,
                second: secondName,
            });
        }
    }

    private deletePath(firstName: string, secondName: string) {
        const oldNumberOfPaths = this.level.travelPaths.length;
        const remainingPaths = this.level.travelPaths.filter(
            (path) =>
                (path.first !== firstName || path.second !== secondName) &&
                (path.first !== secondName || path.second !== firstName)
        );
        this.level.travelPaths = remainingPaths;
        return oldNumberOfPaths > remainingPaths.length;
    }

    private addExportLevelButton() {
        const saveToFile = () => {
            const data = JSON.stringify(this.level, null, 4);
            const blob = new Blob([data], {
                type: 'application/json',
            });
            saveAs(blob, 'level.json');
        };
        DownloadButton(this, saveToFile);
    }

    private addBlankLevelButton() {
        const deleteCitiesAndPaths = () => {
            const buildings = this.buildings().display.map(
                (cityContainer) => cityContainer.name
            );
            buildings.forEach((name) => this.removeCity(name));
        };
        BlancLevelButton(this, deleteCitiesAndPaths);
    }

    private addDeleteCityButton() {
        const deleteCityByName = () => {
            const chosenBuilding = this.buildings().display.find((building) =>
                building.isChosen()
            );
            if (chosenBuilding) {
                this.removeCity(chosenBuilding.name);
            }
        };
        DeleteCityButton(this, deleteCityByName);
    }

    private removeCity(name: string) {
        this.level.cities = this.level.cities.filter(
            (city) => city.name !== name
        );
        this.level.shops = this.level.shops?.filter(
            (shop) => shop.name !== name
        );
        this.level.travelPaths = this.level.travelPaths.filter(
            (path) => path.first !== name && path.second !== name
        );
        this.buildings()
            .display.filter((container) => container.name === name)
            .forEach((building) => building.destroy());
        this.cities = this.cities.filter(
            (container) => container.name !== name
        );
        this.shops = this.shops.filter((container) => container.name !== name);
        if (this.level.player.location === name) {
            this.level.player.location = '';
        }
    }

    private addMainSceneButton() {
        const playMap = () => {
            if (this.startWasChosen()) {
                this.goToMainScene();
            }
        };
        PlayMyMapButton(this, playMap);
    }

    private startWasChosen() {
        return this.buildings().display.some(
            (container) => container.name === this.level.player.location
        );
    }

    private goToMainScene() {
        const tryOutLevel = this.level;
        this.scene.add('mainScene', MainScene, true, {
            level: tryOutLevel,
        });
        const jsonTryOutLevel = JSON.stringify(tryOutLevel);
        localStorage.removeItem(STORED_LEVEL_KEY);
        localStorage.setItem(STORED_LEVEL_KEY, jsonTryOutLevel);
        const textField = document.getElementById('text');
        textField?.remove();
        this.scene.remove(this);
    }
}
