import { Scene, Types } from "phaser";
import * as io from "socket.io-client";
import { Player } from "./Player";

interface IPlayers {
    [key: string]: Player;
}

export class MainScene extends Scene {
    private player: Player;
    private players: IPlayers = {};
    private cursors: Types.Input.Keyboard.CursorKeys;
    private socket: SocketIOClient.Socket;

    constructor() {
        super({
            key: "MainScene",
        });
    }

    public create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.socket = io("http://localhost:3000");
        this.socket.on("connect", () => {
            this.player = new Player(this, 100, 100, this.socket.id);
            this.players[this.socket.id] = this.player;
        });
        this.socket.on("setPosition", player => {
            this.players[player.id].setPosition(player.x, player.y);
        });
        this.socket.on("syncJoinedPlayers", data => {
            this.syncJoinedPlayers(data.players);
        });
        this.socket.on("delete", data => {
            this.players[data.id].destroy();
            delete this.players[data.id];
        });
    }

    public update() {
        if (this.cursors.down.isDown) {
            this.socket.emit("moveDown");
        }
        if (this.cursors.up.isDown) {
            this.player.moveUp();
        }
        if (this.cursors.left.isDown) {
            this.player.moveLeft();
        }
        if (this.cursors.right.isDown) {
            this.player.moveRight();
        }
    }

    private syncJoinedPlayers(players: IPlayers) {
        for (const id of Object.keys(players)) {
            if (!this.players[id]) {
                const player = players[id];
                this.players[id] = new Player(
                    this,
                    player.x,
                    player.y,
                    player.id
                );
            }
        }
    }
}
