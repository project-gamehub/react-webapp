import socket from "../../../utils/getTicTacToeSocket";

const WaitingLobby = ({ gameId, setGameCreated, accessToken }) => {
    const closeLobby = () => {
        socket.emit("closeLobby", { accessToken, gameId });
        setGameCreated(false);
    };

    return (
        <>
            <div>Waiting for other player</div>
            <div>Game id is: {gameId}</div>
            <button onClick={closeLobby} className="tic-tac-toe-action-btn">
                Close lobby
            </button>
        </>
    );
};

export default WaitingLobby;
