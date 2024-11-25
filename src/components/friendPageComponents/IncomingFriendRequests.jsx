import { useSelector } from "react-redux";
import IncomingRequestListContainer from "./IncomingRequestListContainer";
import "../../styles/friendsPageStyles/incomingFriendRequest.css";

const IncomingFriendRequests = () => {
    const incomingRequestList = useSelector(
        (state) => state.friendsDataSlice.incomingRequestList
    );

    return (
        <div className="friend-page-list">
            <div className="friend-list-header">
                Incoming Friend Requests{" "}
                {incomingRequestList != null && (
                    <span>({incomingRequestList.length})</span>
                )}
            </div>
            <IncomingRequestListContainer />
        </div>
    );
};

export default IncomingFriendRequests;
