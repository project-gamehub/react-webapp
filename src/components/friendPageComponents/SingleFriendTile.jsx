import { useNavigate } from "react-router-dom";
import FriendPageAvatarAndUsername from "./FriendPageAvatarAndUsername";
import MessageAndUnfriend from "./MessageAndUnfriend";
import useUsername from "../../utils/useUsername";
import { useSelector } from "react-redux";

const SingleFriendTile = ({ userId }) => {
    const navigate = useNavigate();

    const handleTileClick = () => {
        navigate(`/user/${userId}`);
    };

    const username = useUsername(userId);

    const searchBarValue = useSelector(
        (state) => state.friendsDataSlice.searchBarValue
    );

    if (
        searchBarValue == "" ||
        username.includes(searchBarValue.trim().toLowerCase())
    ) {
        return (
            <div className="friend-page-single-tile" onClick={handleTileClick}>
                <FriendPageAvatarAndUsername userId={userId} />
                <MessageAndUnfriend userId={userId} />
            </div>
        );
    }

    return <></>;
};

export default SingleFriendTile;
