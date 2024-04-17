import React from "react";
import Carousel from "./Carousel";
import "../styles/gamepagecard.css";
import StarRating from "./StarRating";

const GamePageCard = ({ data }) => {
    return (
        <>
            <div>
                <div className="carasoulContainer">
                    <Carousel data={data} />
                </div>
                <div className="game-data-style">
                    <div>
                        <h1 className="game-name">{data.name}</h1>
                        <h4 className="game-description">{data.description}</h4>
                    </div>
                    <StarRating />
                </div>
            </div>
        </>
    );
};

export default GamePageCard;
