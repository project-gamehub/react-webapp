import socket from "../../../../utils/getTicTacToeSocket";

const joinGame = (accessToken, gameId) => {
    if (!gameId) {
        alert("Please enter a Game ID to join");
        return;
    }
    socket.emit("joinGame", { accessToken, gameId }, (response) => {
        if (response.error) {
            throw new Error(response.message);
        }
    });
};

export default joinGame