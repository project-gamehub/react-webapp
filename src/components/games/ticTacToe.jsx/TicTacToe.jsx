import React, { useState, useEffect } from "react";
import socket from "../../../utils/getTicTacToeSocket";
import { useSelector } from "react-redux";
import "../../../styles/games/ticTacToe/tic-tac-toe.css";
import Board from "./Board";
import StartPage from "./StartPage";
import PlayerUsernames from "./PlayerUsernames";
import ShowWinner from "./ShowWinner";
import WaitingLobby from "./WaitingLobby";

const TicTacToe = () => {
    const accessToken = useSelector((state) => state.userDataSlice.accessToken);
    if (!accessToken) {
        // TODO - if user is not login in any page that requires login, redirect user to login page
        throw new Error("User not logged in");
    }

    const selfUserId = useSelector(
        (state) => state.userDataSlice?.userProfileDetails?._id
    );

    const [selfUserRole, setSelfUserRole] = useState("");
    const [opponentUserId, setOpponentUserId] = useState();
    const [gameId, setGameId] = useState("");
    const [board, setBoard] = useState(Array(9).fill(null));
    const [playingTurn, setPlayingTurn] = useState("");
    const [gameStarted, setGameStarted] = useState(false);
    const [gameCreated, setGameCreated] = useState(false);
    const [winner, setWinner] = useState("");
    const [currentUserTurn, setCurrentUserTurn] = useState(false);

    useEffect(() => {
        if (playingTurn === opponentUserId) {
            setCurrentUserTurn(false);
        } else {
            setCurrentUserTurn(true);
        }
    }, [opponentUserId, playingTurn]);

    useEffect(() => {
        // Listen for game start
        socket.on("gameStart", ({ players }) => {
            setBoard(Array(9).fill(null));
            setWinner("");

            if (players[0].userId === selfUserId) {
                setSelfUserRole(players[0].role);
                setOpponentUserId(players[1].userId);
            } else {
                setSelfUserRole(players[1].role);
                setOpponentUserId(players[0].userId);
            }

            if (players[0].role === "O") {
                setPlayingTurn(players[0].userId);
            } else {
                setPlayingTurn(players[1].userId);
            }
            setGameStarted(true);
        });

        // Listen for game updates
        socket.on("gameUpdate", (game) => {
            setBoard(game.board);
            setPlayingTurn(game.currentPlayer);
        });

        // Listen for game over
        socket.on("gameOver", ({ winner }) => {
            setWinner(winner);
        });

        return () => {
            socket.off("gameStart");
            socket.off("gameUpdate");
            socket.off("gameOver");
        };
    }, [selfUserId, opponentUserId]);

    if (!selfUserId) {
        return <>Loading...</>;
    }

    return (
        <div className="tic-tac-toe">
            <h2 className="tic-tac-toe-heading">Tic Tac Toe</h2>
            {!gameStarted ? (
                gameCreated ? (
                    <WaitingLobby
                        gameId={gameId}
                        setGameCreated={setGameCreated}
                        accessToken={accessToken}
                    />
                ) : (
                    <StartPage
                        accessToken={accessToken}
                        setGameId={setGameId}
                        gameId={gameId}
                        setGameCreated={setGameCreated}
                    />
                )
            ) : (
                <div>
                    <PlayerUsernames opponentId={opponentUserId} />
                    <Board
                        board={board}
                        gameId={gameId}
                        currentPlayer={playingTurn}
                        currentUserId={selfUserId}
                        accessToken={accessToken}
                        currentUserTurn={currentUserTurn}
                        winner={winner}
                    />
                    {currentUserTurn ? (
                        <>Its your turn</>
                    ) : (
                        <>Its opponents turn</>
                    )}
                    <p>You are {selfUserRole}</p>
                </div>
            )}
            {winner && winner === "Draw" ? (
                <>It's a Draw!</>
            ) : (
                <ShowWinner winner={winner} />
            )}
        </div>
    );
};

export default TicTacToe;
