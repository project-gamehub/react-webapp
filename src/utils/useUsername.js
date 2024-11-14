import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsernameFromId } from "../config/otherUserSlice";

const useUsername = (userId) => {
    const dispatch = useDispatch();

    const username = useSelector(
        (state) => state.otherUsersDataSlice.otherUsersData[userId]?.username
    );

    useEffect(() => {
        if (!username && userId) {
            dispatch(fetchUsernameFromId(userId));
        }
    }, [dispatch, userId, username]);

    return username;
};

export default useUsername;
