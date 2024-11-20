import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriendList } from "../config/friendsDataSlice";
import IncomingFriendRequests from "../components/friendPageComponents/IncomingFriendRequests";

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

    return (
        <div>
            Friends
            <IncomingFriendRequests />
        </div>
    );
};

export default Friends;
