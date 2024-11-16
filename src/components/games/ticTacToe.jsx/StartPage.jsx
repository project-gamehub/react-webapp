import { useState } from "react";
import createGame from "./utils/createGame";
import joinGame from "./utils/joinGame";

const StartPage = ({ accessToken, setGameId, gameId }) => {
    const [showJoinInterface, setShowJoinInterface] = useState(false);

    return (
        <div className="tic-tac-toe-start-page">
            <h2 className="tic-tac-toe-heading">Tic Tac Toe</h2>
            <button
                onClick={() => {
                    createGame(accessToken, setGameId);
                }}
                className="tic-tac-toe-action-btn"
            >
                Create Game
            </button>
            <button
                onClick={() => setShowJoinInterface(true)}
                className="tic-tac-toe-action-btn"
            >
                Join Game
            </button>
            {showJoinInterface && (
                <div className="tic-tac-toe-join-game-interface">
                    <div className="close-tic-tac-toe-join-game-interface-container">
                        <span
                            onClick={() => setShowJoinInterface(false)}
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
                            className="tic-tac-toe-join-game-button"
                            onClick={() => joinGame(accessToken, gameId)}
                        >
                            Join Game
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StartPage;
