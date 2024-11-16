import socket from "../../../../utils/getTicTacToeSocket";

const makeMove = (index, board, gameId, currentPlayer, currentUserId, accessToken) => {
    if (
        board[index] !== null ||
        currentPlayer !== currentUserId
    ) {
        return;
    }

    socket.emit("makeMove", {
        gameId,
        index,
        accessToken
    });
};

export default makeMove