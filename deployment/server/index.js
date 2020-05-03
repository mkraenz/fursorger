var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

const players = {};
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
io.origins("*:*");
io.on("connection", socket => {
    players[socket.id] = { x: 100, y: 100, id: socket.id };
    io.emit("syncJoinedPlayers", { players });
    console.log({ players });
    socket.on("disconnect", () => {
        delete players[socket.id];
        io.emit("delete", { id: socket.id });
    });
    socket.on("moveDown", () => {
        players[socket.id].y += 10;
        io.emit("setPosition", players[socket.id]);
    });
    socket.on("moveUp", () => {
        players[socket.id].y -= 10;
        io.emit("setPosition", players[socket.id]);
    });
    socket.on("moveRight", () => {
        players[socket.id].x += 10;
        io.emit("setPosition", players[socket.id]);
    });
    socket.on("moveLeft", () => {
        players[socket.id].x -= 10;
        io.emit("setPosition", players[socket.id]);
    });
});

http.listen(3000, () => {
    console.log("listening on *:3000");
});
