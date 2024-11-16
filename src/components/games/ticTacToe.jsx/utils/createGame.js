import socket from "../../../../utils/getTicTacToeSocket";

const createGame = (accessToken, setGameId) => {
    socket.emit("createGame", { accessToken }, (response) => {
        if (response.error) {
            throw new Error(response.message);
        }
        setGameId(response);
        alert(`Game created! Share this Game ID: ${response}`);
    });
};

export default createGame