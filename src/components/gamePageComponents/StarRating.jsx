import { useEffect } from "react";
import Stars from "./Stars";
import "../../styles/star-rating.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchRatingData } from "../../config/gamesDataSlice";

const StarRating = ({ gameId }) => {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.userDataSlice.accessToken);
    const ratingData = useSelector(
        (state) => state.gamesDataSlice.ratingData[gameId]
    );

    useEffect(() => {
        if (accessToken) {
            dispatch(fetchRatingData({ gameId }));
        }
    }, [accessToken, gameId, dispatch]);

    return (
        <div>
            <div className="rating-wrapper">
                <div className="ratings">
                    <h2 className="current-rating">
                        Rating: {ratingData?.averageRating || "N/A"}
                    </h2>
                    <h3>
                        <Stars gameId={gameId} />
                    </h3>
                </div>
                <div className="total-ratings">
                    (Total {ratingData?.totalRatings || 0} ratings)
                </div>
            </div>
        </div>
    );
};

export default StarRating;
