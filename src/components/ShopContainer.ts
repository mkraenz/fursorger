import { GameObjects, Scene } from 'phaser';
import { toHex } from '../styles/Color';

export interface IPricingHandler {
    addToPrice: (summand: number) => void;
}

const textStyle = {
    font: '48px Metamorphous',
    fill: '#000000',
};

enum stateColors {
    chosen = '#4FE490',
    default = '#FFFFFF',
    dragging = '#95EEBC',
}
const TEXT_TO_ICON_OFFSET = -25;
const PRICE_Y = 60;
const BUTTON_X = 100;
const NAME_TEXT_TO_BUTTON_OFFSET = 20;
const MAIN_BUTTON_INDEX = 0;
const PRICE_TEXT_INDEX = 2;
const PRICE_PLUS_INDEX = 3;
const PRICE_MINUS_INDEX = 4;
const NAME_TEXT_INDEX = 5;
export class ShopContainer extends Phaser.GameObjects.Container {
    public state: stateColors;
    private onTranslation: (x: number, y: number) => void;
    private price: number;

    private onPricing: IPricingHandler;

    constructor(
        scene: Scene,
        x: number,
        y: number,
        name: string,
        price: number,
        onPricing: IPricingHandler,
        onTranslation: (x: number, y: number) => void
    ) {
        const mainButton = scene.add.image(0, 0, 'rectangleButton');
        mainButton.setName('mainButton');
        super(scene, x, y, [mainButton]);
        this.price = price;
        this.onPricing = onPricing;
        this.setName(name);
        scene.add.existing(this);
        // setSize() is crucial to avoid "gameObject.input is null"
        this.setSize(mainButton.width, mainButton.height);
        this.setInteractions();
        this.state = stateColors.default;
        this.onTranslation = onTranslation;
        this.addPrice();
        // changing the order of lines here implies a change of index constants...
        this.addNameText();
    }

    public deactivate() {
        this.state = stateColors.default;
    }

    public isChosen() {
        return this.state === stateColors.chosen;
    }

    public update() {
        (
            this.getFirst('name', 'mainButton') as Phaser.GameObjects.Image
        ).setTint(toHex(this.state));
        this.updateTextAndButton();

        (this.getButtons() as GameObjects.Image[]).forEach((button) => {
            button.setVisible(this.state !== stateColors.default);
        });
    }

    private setInteractions() {
        this.setInteractive();
        this.setDepth(1);
        this.scene.input.setDraggable(this);
        this.defineDrag();
        this.defineClickUp();
        this.defineClickDown();
    }

    private defineClickDown() {
        this.off('pointerup');
        this.defineClickUp();
    }

    private defineDrag() {
        this.on('drag', (pointer, dragX, dragY) => {
            this.x = dragX;
            this.y = dragY;
            this.onTranslation(dragX, dragY);
            this.state = stateColors.dragging;
        });
    }

    private defineClickUp() {
        // otherwise previous pointerup-listeners will stack
        this.on('pointerup', () => {
            if (this.state === stateColors.dragging) {
                this.state = stateColors.default;
            } else {
                if (this.state === stateColors.chosen) {
                    this.state = stateColors.default;
                } else {
                    this.state = stateColors.chosen;
                }
            }
        });
    }

    private addNameText() {
        const textField = this.scene.add.text(-70, -30, this.name, textStyle);
        this.add(textField);
    }

    private addPrice() {
        this.addPriceTexts();
        this.addPriceButtons();
    }

    private addPriceButtons() {
        const buttonX = BUTTON_X;
        const priceButtonY = PRICE_Y;

        const plusPrice = this.scene.add
            .image(buttonX, priceButtonY - 20, 'plus')
            .setScale(0.5)
            .setInteractive();
        plusPrice.on('pointerup', () => {
            this.price += 1;
            this.onPricing.addToPrice(1);
        });
        plusPrice.setVisible(false);

        const minusPrice = this.scene.add
            .image(buttonX, priceButtonY + 20, 'minus')
            .setScale(0.5)
            .setInteractive();

        minusPrice.on('pointerup', () => {
            this.price -= 1;
            this.onPricing.addToPrice(-1);
        });

        minusPrice.setVisible(false);

        this.add([plusPrice, minusPrice]);
    }

    private getButtons() {
        return [this.getAt(PRICE_MINUS_INDEX), this.getAt(PRICE_PLUS_INDEX)];
    }

    private addPriceTexts() {
        const price = this.scene.add.image(0, PRICE_Y, 'production');
        const priceText = this.scene.add.text(
            0 + 40,
            PRICE_Y + TEXT_TO_ICON_OFFSET,
            '',
            textStyle
        );
        priceText.w = 0;
        this.add([price, priceText]);
    }

    private updateTextAndButton() {
        const priceText = this.getAt(PRICE_TEXT_INDEX) as GameObjects.Text;

        priceText.setText(this.price.toString());
        const nameText = this.getAt(NAME_TEXT_INDEX) as GameObjects.Text;
        nameText.setText(this.name);
        const mainButton = this.getAt(MAIN_BUTTON_INDEX) as GameObjects.Image;
        const xScale =
            (nameText.width + 2 * NAME_TEXT_TO_BUTTON_OFFSET) /
            mainButton.width;
        mainButton.setScale(xScale, 1);
        nameText.x =
            (-mainButton.width * xScale) / 2 + NAME_TEXT_TO_BUTTON_OFFSET;
        nameText.y = -mainButton.height / 2;
    }
}
