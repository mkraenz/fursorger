import { Game } from "phaser";
import * as io from "socket.io-client";
import { connectionConfig, gameConfig } from "./game-config";

main();

function main() {
    window.addEventListener("load", () => {
        // tslint:disable-next-line:no-unused-expression
        new Game(gameConfig);
        // connectSocket();
    });
}

const connectSocket = () => {
    const socket = io(connectionConfig.socketUrl);
    socket.on("new_player", data => {
        console.log(data);
    });
    socket.on("welcome", data => {
        console.log(data);
    });

    document.createElement("input");
    const textField: HTMLInputElement = document.createElement("input");
    textField.type = "text";
    textField.id = "text-input";
    textField.addEventListener("keyup", event => {
        if (event.keyCode === 13) {
            event.preventDefault();
            socket.emit("message", { message: textField.value });
            textField.value = "";
        }
    });
    const messageList = document.getElementById("messages");
    messageList.appendChild(textField);

    socket.on("message", ({ message }) => {
        console.log({ message });
        const listElement: HTMLLIElement = document.createElement("li");
        listElement.innerHTML = message;
        messageList.appendChild(listElement);
    });
};
