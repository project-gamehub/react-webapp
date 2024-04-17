// import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import GamePageCard from "../components/GamePageCard";
import Leaderboard from "../components/Leaderboard";
import "../styles/game-page.css";

const GamePage = () => {
    const { gameslug } = useParams();

    const gameData = useSelector((state) => state.gameDataSlice.value)?.find(
        (item) => item.slug === gameslug
    );

    if (gameData === undefined) {
        return (
            <>
                {" "}
                <h1>Game Not Found!</h1>{" "}
            </>
        );
    }

    return (
        <div className="game-page-container">
            {gameData ? <GamePageCard data={gameData} /> : ""}
            <div className="lb-container">
                <h2>Leaderboard</h2>
                <Leaderboard />
            </div>
        </div>
    );
};

export default GamePage;
