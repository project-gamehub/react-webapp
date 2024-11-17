import { useState } from "react";
import createGame from "./utils/createGame";
import JoinGameInterface from "./JoinGameInterface";

const StartPage = ({ accessToken, setGameId, gameId, setGameCreated }) => {
    const [showJoinInterface, setShowJoinInterface] = useState(false);

    return (
        <div className="tic-tac-toe-start-page">
            <button
                onClick={() => {
                    createGame(accessToken, setGameId, setGameCreated);
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
                <JoinGameInterface
                    accessToken={accessToken}
                    setShowJoinInterface={setShowJoinInterface}
                    setGameId={setGameId}
                    gameId={gameId}
                />
            )}
        </div>
    );
};

export default StartPage;
