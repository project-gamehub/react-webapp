import socket from "../../../../utils/getTicTacToeSocket";

const createGame = (accessToken, setGameId, setGameCreated) => {
    socket.emit("createGame", { accessToken }, (response) => {
        if (response.error) {
            throw new Error(response.message);
        }
        setGameId(response);
        setGameCreated(true);
    });
};

export default createGame;
