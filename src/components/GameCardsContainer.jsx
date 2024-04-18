import GameCard from "./GameCard";
import "../styles/gamecardcontainer.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchGameData } from "../config/gameDataSlice";

const GameCardsContainer = () => {
    const { data, error, loading } = useSelector(
        (state) => state.gameDataSlice
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGameData());
    }, [dispatch]);

    return (
        <>
            <div className="game-cards-container">
                {loading ? (
                    <>
                        <GameCard loading={true} />
                        <GameCard loading={true} />
                        <GameCard loading={true} />
                        <GameCard loading={true} />
                    </>
                ) : error ? (
                    "Error"
                ) : (
                    data.map((games) => (
                        <GameCard data={games} key={games._id} />
                    ))
                )}
            </div>
        </>
    );
};

export default GameCardsContainer;
