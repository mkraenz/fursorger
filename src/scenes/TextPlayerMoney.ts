import { GameObjects } from "phaser";
import { Color } from "../Color";
import { IPlayer } from "./IPlayer";

export class TextPlayerMoney extends GameObjects.Text {
    private player!: IPlayer;

    public init(player: IPlayer) {
        this.player = player;
        this.setFontFamily("Arial")
            .setFontSize(32)
            .setColor(Color.black);
    }

    public update() {
        this.setText(`Gold: ${this.player.getMoney()}`);
    }
}
