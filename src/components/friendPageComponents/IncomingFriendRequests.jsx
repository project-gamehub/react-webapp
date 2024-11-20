import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIncomingRequestList } from "../../config/friendsDataSlice";

const IncomingFriendRequests = () => {
    const {
        incomingRequestList,
        incomingRequestListError,
        incomingRequestListLoading
    } = useSelector((state) => state.friendsDataSlice);

    const dispatch = useDispatch();

    useEffect(() => {
        if (incomingRequestList == null) {
            dispatch(fetchIncomingRequestList());
        }
    }, [dispatch, incomingRequestList]);

    return <div>IncomingFriendRequests</div>;
};

export default IncomingFriendRequests;
