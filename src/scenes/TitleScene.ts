import { Scene } from "phaser";
import * as io from "socket.io-client";
import { connectionConfig } from "../game-config";
import { levels } from "../levels";
import { setLevel } from "../registry/level";
import { Color } from "../styles/Color";
import { setDefaultTextStyle } from "../styles/Text";
import { MainScene } from "./mainScene";

export class TitleScene extends Scene {
    private halfWidth!: number;
    private halfHeight!: number;
    private socket!: SocketIOClient.Socket;
    private myPlayerId!: string;
    private players!: string[];

    constructor() {
        super({
            key: "Title",
        });
    }

    public create() {
        this.halfWidth = this.scale.width / 2;
        this.halfHeight = this.scale.height / 2;
        this.addTitles();
    }

    private addTitles() {
        const title = this.add
            .text(this.halfWidth, this.halfHeight - 200, "Fursorger")
            .setOrigin(0.5);
        setDefaultTextStyle(title);
        title.setFontSize(112);
        title.setColor(Color.White);

        const subtitle = this.add
            .text(
                this.halfWidth,
                this.halfHeight - 120,
                "Our world is dying. Can you save us?"
            )
            .setOrigin(0.5);
        setDefaultTextStyle(subtitle);
        subtitle.setColor(Color.White);

        const newMultiplayer = this.add
            .text(this.halfWidth, this.halfHeight, "New Multiplayer")
            .setOrigin(0.5)
            .setInteractive();
        setDefaultTextStyle(newMultiplayer);
        newMultiplayer.setColor(Color.White);
        newMultiplayer.addListener("pointerup", async () => {
            if (this.socket) {
                return;
            }
            const playerTable = this.add.text(
                this.halfHeight,
                this.halfHeight + 200,
                ""
            );
            const redrawPlayers = () => {
                const playerList = this.players
                    .map(p => (p === this.myPlayerId ? `${p} (you)` : p))
                    .join("\n");
                playerTable.setText(playerList);
            };

            this.socket = io(connectionConfig.socketUrl);
            this.socket.on("welcome", data => {
                console.log({ data, event: "welcome" });
                this.players = data.players;
                this.myPlayerId = data.playerId;
                redrawPlayers();
            });

            this.socket.on(
                "player_joined",
                ({ playerId }: { playerId: string }) => {
                    this.players.push(playerId);
                    redrawPlayers();
                }
            );

            this.socket.on(
                "player_disconnected",
                ({ playerId }: { playerId: string }) => {
                    console.log(`remove ${playerId}`);
                    const disconnectedIndex = this.players.findIndex(
                        id => id === playerId
                    );
                    this.players.splice(disconnectedIndex, 1);
                    redrawPlayers();
                }
            );

            const readyButton = this.add
                .text(this.halfHeight, this.halfHeight + 100, "Click to start")
                .setInteractive();
            readyButton.on("pointerup", () => {
                readyButton.setText("waiting for other players...");
                this.socket.emit("player_ready");
            });

            this.socket.on("game-started", data => {
                console.log(data);
                levels.push(data.game);
                setLevel(this.registry, levels.length - 1);
                this.scene.add("Main", MainScene, true);
                this.scene.remove(this);
            });

            newMultiplayer.destroy();
        });
    }
}
