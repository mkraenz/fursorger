import { Game } from "phaser";
import { gameConfig } from "./game-config";

main();

function main() {
    window.addEventListener("load", () => {
        // tslint:disable-next-line:no-unused-expression
        new Game(gameConfig);
    });
}
