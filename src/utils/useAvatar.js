import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvatarURLFromId } from "../config/otherUserSlice";

const useAvatar = (userId) => {
    const dispatch = useDispatch();

    const userAvatarURL = useSelector(
        (state) => state.otherUsersDataSlice.otherUsersData[userId]?.avatarURL
    );

    useEffect(() => {
        if (!userAvatarURL && userId) {
            dispatch(fetchAvatarURLFromId(userId));
        }
    }, [dispatch, userId, userAvatarURL]);

    return userAvatarURL;
};

export default useAvatar;
