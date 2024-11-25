import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIncomingRequestList } from "../../config/friendsDataSlice";
import SingleRequestTile from "./SingleRequestTile";

const IncomingRequestListContainer = () => {
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

    if (incomingRequestListLoading) {
        // TODO - Implement shimmer
        return <div>Loading...</div>;
    }

    if (incomingRequestListError) {
        return <div>Error!</div>;
    }

    return (
        <div className="friend-page-list-container">
            {incomingRequestList.map((requesterId) => {
                return (
                    <SingleRequestTile
                        key={requesterId}
                        requesterId={requesterId}
                    />
                );
            })}
        </div>
    );
};

export default IncomingRequestListContainer;
