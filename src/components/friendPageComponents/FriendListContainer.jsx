import { useDispatch, useSelector } from "react-redux";
import { fetchFriendList } from "../../config/friendsDataSlice";
import { useEffect } from "react";
import SingleFriendTile from "./SingleFriendTile";
import "../../styles/friendsPageStyles/friendList.css";

const FriendListContainer = () => {
    const { friendList, friendListError, friendListLoading } = useSelector(
        (state) => state.friendsDataSlice
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (friendList == null) {
            dispatch(fetchFriendList());
        }
    }, [dispatch, friendList]);

    if (friendListLoading) {
        // TODO - Implement shimmer
        return <div>Loading...</div>;
    }

    if (friendListError) {
        return <div>Error!</div>;
    }

    return (
        <div className="friend-page-list-container">
            {friendList.map((friendId) => {
                return <SingleFriendTile key={friendId} userId={friendId} />;
            })}
        </div>
    );
};

export default FriendListContainer;
