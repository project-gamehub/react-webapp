import { useNavigate } from "react-router-dom";
import FriendPageAvatarAndUsername from "./FriendPageAvatarAndUsername";
import MessageAndUnfriend from "./MessageAndUnfriend";

const SingleFriendTile = ({ userId }) => {
    const navigate = useNavigate();

    const handleTileClick = () => {
        navigate(`/user/${userId}`);
    };

    return (
        <div className="friend-page-single-tile" onClick={handleTileClick}>
            <FriendPageAvatarAndUsername userId={userId} />
            <MessageAndUnfriend userId={userId} />
        </div>
    );
};

export default SingleFriendTile;
