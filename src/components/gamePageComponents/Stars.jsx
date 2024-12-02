import { useState, useEffect } from "react";
import "../../styles/stars.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { GAMES_SERVICE_URL } from "../../utils/constant";

const Stars = ({ gameId }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const accessToken = useSelector((state) => state.userDataSlice.accessToken);
    const userRating = useSelector(
        (state) => state.gamesDataSlice.ratingData[gameId]?.userRating
    );

    useEffect(() => {
        if (userRating !== undefined) {
            setRating(userRating);
        }
    }, [userRating]);

    const handleUpdateRating = async (ratingValue) => {
        if (!accessToken) {
            toast.error("User not logged in");
            return;
        }

        try {
            await axios.post(
                `${GAMES_SERVICE_URL}/add-rating/${gameId}?rating=${ratingValue}`,
                {},
                {
                    headers: {
                        "access-token": accessToken
                    }
                }
            );
            setRating(ratingValue);
        } catch (error) {
            console.log(error);
        }
    };

    return [...Array(5)].map((_, index) => (
        <span
            key={index}
            className={`${
                index + 1 <= rating
                    ? "material-symbols-rounded selectedRating"
                    : "material-symbols-rounded"
            } ${index + 1 <= hoverRating ? "selectedRating" : ""}`}
            onClick={() => handleUpdateRating(index + 1)}
            onMouseOver={() => setHoverRating(index + 1)}
            onMouseOut={() => setHoverRating(0)}
        >
            star
        </span>
    ));
};

export default Stars;
