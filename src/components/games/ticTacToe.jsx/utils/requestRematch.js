import socket from "../../../../utils/getTicTacToeSocket";

const requestRematch = (accessToken, gameId, setRematchRequested) => {
    socket.emit("requestRematch", {
        accessToken,
        gameId
    });
    setRematchRequested(true);
};

export default requestRematch;
