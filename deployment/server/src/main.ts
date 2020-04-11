import * as express from 'express';
import * as http from 'http';
import * as socketIO from 'socket.io';
import { Game } from './Game';

const port = process.env.PORT || 3000;

const app = express();
app.use(express.static('public'));
const httpServer = http.createServer(app);
const io = socketIO(httpServer);

const playerIds: string[] = [];
const readyPlayers: string[] = [];
let game: Game | null = null;

io.on('connection', socket => {
    console.log(`user ${socket.id} connected`);
    socket.on('disconnect', handleDisconnect(socket));
    socket.on('player_ready', handlePlayerReady(socket));

    handleConnect(socket)();
});

httpServer.listen(port, () => {
    console.log(`app listening on port ${port}`);
});

const handleConnect = (socket: socketIO.Socket) => () => {
    playerIds.push(socket.id);
    socket.emit('welcome', {
        playerId: socket.id,
        players: playerIds,
        playerCount: playerIds.length,
    }); // private message
    socket.broadcast.emit('player_joined', {
        playerId: socket.id,
        playerCount: playerIds.length,
    }); // broadcast message to all others
};

const handleDisconnect = (socket: socketIO.Socket) => () => {
    console.log(`user ${socket.id} disconnected`);
    if (!game) {
        const disconnectedIndex = playerIds.findIndex(id => id === socket.id);
        playerIds.splice(disconnectedIndex, 1);
        socket.broadcast.emit('player_disconnected', { playerId: socket.id });
    }
};

const handlePlayerReady = socket => () => {
    if (readyPlayers.includes(socket.id)) {
        return;
    }

    readyPlayers.push(socket.id);

    if (readyPlayers.length === playerIds.length) {
        game = new Game(playerIds);
        io.emit('game-started', { game });
    }
};
