import { Link } from "react-router-dom";
import "../styles/gamecard.css";
import Shimmer from "./Shimmer";

const GameCard = ({ data, loading }) => {
    return (
        <>
            <Link to={data?.gameLink} className="gamecardlinks">
                <div className="game-card">
                    <div className="image-container">
                        {loading ? (
                            <Shimmer></Shimmer>
                        ) : (
                            <img
                                src={
                                    data?.poster
                                        ? data?.poster
                                        : "https://th.bing.com/th/id/OIP.eNoAOBEsHuWCc9MMxdM_SQAAAA?rs=1&pid=ImgDetMain"
                                }
                                alt={data?.gameName}
                            />
                        )}
                    </div>
                    <h1 className="game-name-container">
                        {loading ? <Shimmer></Shimmer> : data.gameName}
                    </h1>
                    <div className="play-button-container">
                        {" "}
                        {loading ? (
                            <Shimmer></Shimmer>
                        ) : data?.comingSoon ? (
                            "Coming soon"
                        ) : (
                            "Click to play"
                        )}{" "}
                    </div>
                </div>
            </Link>
        </>
    );
};

export default GameCard;
