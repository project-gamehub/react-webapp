import { useSelector } from "react-redux";
import IncomingRequestListContainer from "./IncomingRequestListContainer";

const IncomingFriendRequests = ({ setShowFriendList }) => {
    // TODO - Create a socket to fetch incoming request realtime

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
                <button
                    onClick={() => setShowFriendList(true)}
                    className="change-view-button"
                >
                    View Friends
                </button>
            </div>
            <IncomingRequestListContainer />
        </div>
    );
};

export default IncomingFriendRequests;
