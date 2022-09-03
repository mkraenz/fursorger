import { Input, Scene } from 'phaser';
import { CreditsText } from '../../components/CreditsText';

const cfg = { fadeOut: 800, timeOut: 320 };

export class CreditsScene extends Scene {
    private shuttingDown = false;

    constructor(key = 'CreditsScene') {
        super(key);
    }

    public create() {
        this.addCredits();
        this.stopEventPropagationToOtherScenes();
        this.input.on('pointerup', () => {
            this.shuttingDown = true;
            this.handleCreditEnd();
        });
        this.events.on('wake', () => {
            console.log('wake');

            this.scene.restart();
        });
    }

    private stopEventPropagationToOtherScenes() {
        Object.values(Input.Events).forEach(e =>
            this.input.on(e, () => this.input.stopPropagation())
        );
    }
    private handleCreditEnd() {
        console.log('handleCreditEnd');
        this.input.removeListener('pointerup');
        this.switchWithinTitleScene('MainMenuScene');
    }

    private addCredits() {
        credits.forEach((credit, index) => {
            const addCredit = () => {
                const onComplete = () => {
                    const isFinalCreditText = index === credits.length - 1;
                    if (isFinalCreditText && !this.shuttingDown) {
                        this.handleCreditEnd();
                    }
                };
                new CreditsText(this, credit.text, credit.isHeader, onComplete);
            };
            this.time.delayedCall(cfg.timeOut * index, addCredit);
        });
    }

    private switchWithinTitleScene(key: string) {
        this.scene.sleep();
        this.scene.wake(key);
    }
}

const credits = [
    { text: 'Der Fürsorger', isHeader: true },
    // { text: "" },
    // { text: "" },
    // { text: "" },
    // { text: "Story and Script", isHeader: true },
    // { text: "" },
    // { text: "Matthias Möser" },
    // { text: "Mirco Kraenz" },
    // { text: "" },
    // { text: "" },
    // { text: "Programming", isHeader: true },
    // { text: "" },
    // { text: "Mirco Kraenz" },
    // { text: "Matthias Möser" },
    // { text: "" },
    // { text: "" },
    // { text: "Animations", isHeader: true },
    // { text: "" },
    // { text: "Matthias Möser" },
    // { text: "Mirco Kraenz" },
    // { text: "" },
    // { text: "" },
    // { text: "Art Work", isHeader: true },
    // { text: "" },
    // { text: "Mirco Kraenz" },
    // { text: "" },
    // { text: "Icon made by those-icons from www.flaticon.com" },
    // { text: "Icon made by srip from www.flaticon.com" },
    // { text: "Icon made by monkik from www.flaticon.com" },
    // { text: "Icon made by freepik from www.flaticon.com" },
    // { text: "Icon made by prosymbols from www.flaticon.com" },
    // { text: "Icon made by gregor-cresnar from www.flaticon.com" },
    // { text: "Icon made by roundicons from www.flaticon.com" },
    // { text: "" },
    // {
    //     text:
    //         "Font Metamorphous Copyright (c) 2011 by Sorkin Type Co\n(www.sorkintype.com) under SIL OFL 1.1",
    // },
    // { text: "" },
    // {
    //     text:
    //         "Font IMFellEnglishSC Copyright (c) 2010, Igino Marini\n(mail@iginomarini.com) under SIL OFL 1.1",
    // },
    // { text: "" },
    // {
    //     text:
    //         "SIL OFL 1.1 available at\nhttps://scripts.sil.org/cms/scripts/page.php?item_id=OFL_web",
    // },
    // { text: "" },
    // { text: "" },
    // { text: "" },
    // { text: "Music and Sound", isHeader: true },
    // { text: "" },
    // { text: "Clicking coins by Hansjörg Malthaner under CC-BY 3.0" },
    // { text: "Howling Wind from Dynamicell at freesound.org under CC-BY 3.0" },
    // { text: "" },
    // { text: "" },
    // { text: "Special Thanks", isHeader: true },
    // { text: "" },
    // { text: "to all our dear friends" },
    // { text: "The generous CC0 community" },
    // { text: "Star Trek: Voyager for inspiration!" },
    // { text: "Inkarnate.com for their beautiful map creation tool" },
    // { text: "" },
    // { text: "" },
    // { text: "Made with Phaser 3", isHeader: true },
];
