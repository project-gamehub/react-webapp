import { DEFAULT_PFP_URL } from "../../utils/constant";
import useAvatar from "../../utils/useAvatar";

const FriendPageAvatarAndUsername = ({ userId }) => {
    const avatarUrl = useAvatar(userId);
    console.log(avatarUrl);

    return (
        <div className="friend-page-tile-avatar-and-username disp-flx">
            <div className="friend-page-avatar">
                {avatarUrl ? (
                    <img src={avatarUrl} alt="User's profile pic" />
                ) : (
                    <img src={DEFAULT_PFP_URL} alt="Default profile pic" />
                )}
            </div>
            <div className="friend-page-username">{userId || "username"}</div>
        </div>
    );
};

export default FriendPageAvatarAndUsername;
