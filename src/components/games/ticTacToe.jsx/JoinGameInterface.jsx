import useJoinGame from "./utils/useJoinGame";

const JoinGameInterface = ({
    setShowJoinInterface,
    setGameId,
    accessToken,
    gameId
}) => {
    const joinGame = useJoinGame();
    return (
        <div className="tic-tac-toe-join-game-interface">
            <div className="close-tic-tac-toe-join-game-interface-container">
                <span
                    onClick={() => {
                        setGameId("");
                        setShowJoinInterface(false);
                    }}
                    className="material-symbols-rounded close-tic-tac-toe-join-game-interface"
                >
                    close
                </span>
            </div>
            <div className="tic-tac-toe-join-game-input-container">
                <input
                    className="tic-tac-toe-join-game-input"
                    type="text"
                    placeholder="Enter Game ID"
                    value={gameId}
                    onChange={(e) => setGameId(e.target.value)}
                />

                <button
                    className="tic-tac-toe-action-btn tic-tac-toe-join-game-button"
                    onClick={() => joinGame(accessToken, gameId)}
                >
                    Join Game
                </button>
            </div>
        </div>
    );
};

export default JoinGameInterface;
