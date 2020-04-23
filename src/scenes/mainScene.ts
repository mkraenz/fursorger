import { Scene, Types } from "phaser";
import * as io from "socket.io-client";
import { Player } from "./Player";

export class MainScene extends Scene {
    private player: Player;
    private players: Player[];
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
        this.player = new Player(this, 100, 100, this.socket.id);
        this.players = [this.player];
        this.socket.on("setPosition", player => {
            this.players
                .find(entry => entry.id === player.id)
                .setPosition(player.x, player.y);
        });
        this.socket.on("newPlayer", players => {
            this.updatePlayers(players);
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

    private updatePlayers(players: Player[]) {
        this.players = players.map(
            player => new Player(this, player.x, player.y, player.id)
        );
    }
}
