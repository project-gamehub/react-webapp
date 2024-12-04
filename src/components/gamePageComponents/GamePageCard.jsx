import Carousel from "../Carousel";
import "../../styles/gamePageStyles/gamePageCard.css";
import StarRating from "./StarRating";
import { Link, useParams } from "react-router-dom";

const GamePageCard = ({ data }) => {
    const { gameslug } = useParams();
    return (
        <>
            <div className="game-page-card-container">
                <div className="carasoul-container">
                    <Carousel data={data} />
                </div>
                <div className="play-button-for-small-screen-container disp-flx">
                    {data.comingSoon ? (
                        <h2 className="play-button-for-small-screen">
                            Coming Soon
                        </h2>
                    ) : (
                        <button
                            type="button"
                            className="play-button-for-small-screen play-now-button"
                        >
                            <Link
                                className="link-of-play-button-for-small-screen"
                                to={"/play/" + gameslug}
                            >
                                Play Now
                            </Link>
                        </button>
                    )}
                </div>
                <div className="game-data-style">
                    <div className="game-info">
                        <h1 className="game-name">{data?.gameName}</h1>
                        <p className="game-description">{data?.description}</p>
                    </div>
                    <StarRating gameId={data?._id} />
                </div>
            </div>
        </>
    );
};

export default GamePageCard;
