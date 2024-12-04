import { useSelector } from "react-redux";
import FriendListContainer from "./FriendListContainer";
import FriendSearchBar from "./FriendSearchBar";

const FriendList = ({ setShowFriendList }) => {
    const friendList = useSelector(
        (state) => state.friendsDataSlice.friendList
    );

    return (
        <div className="friend-page-list">
            <div className="friend-list-header">
                Friends&nbsp;
                {friendList != null && <span>({friendList.length})</span>}
                <button
                    onClick={() => setShowFriendList(false)}
                    className="change-view-button"
                >
                    View Incoming Requests
                </button>
            </div>
            <FriendSearchBar />
            <FriendListContainer />
        </div>
    );
};

export default FriendList;
