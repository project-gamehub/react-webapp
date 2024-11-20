import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriendList } from "../config/friendsDataSlice";

const Friends = () => {
    const { friendList, friendListError, friendListLoading } = useSelector(
        (state) => state.friendsDataSlice
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (friendList == null) {
            dispatch(fetchFriendList());
        }
    }, [dispatch, friendList]);

    return <div>Friends</div>;
};

export default Friends;
