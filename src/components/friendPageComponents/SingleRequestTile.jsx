import { useNavigate } from "react-router-dom";
import FriendPageAvatarAndUsername from "./FriendPageAvatarAndUsername";
import AcceptOrReject from "./AcceptOrReject";

const SingleRequestTile = ({ requesterId }) => {
    const navigate = useNavigate();
    const handleTileClick = () => {
        navigate(`/user/${requesterId}`);
    };
    return (
        <div className="friend-page-single-tile" onClick={handleTileClick}>
            <FriendPageAvatarAndUsername userId={requesterId} />
            <AcceptOrReject userId={requesterId} />
        </div>
    );
};

export default SingleRequestTile;
