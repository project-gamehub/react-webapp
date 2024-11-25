import useAvatar from "../../utils/useAvatar";
import useUsername from "../../utils/useUsername";

const FriendPageAvatarAndUsername = ({ userId }) => {
    const avatarUrl = useAvatar(userId);
    const username = useUsername(userId);

    return (
        <div className="friend-page-tile-avatar-and-username disp-flx">
            <div className="friend-page-avatar disp-flx">
                {avatarUrl ? (
                    <img src={avatarUrl} alt="User's profile pic" />
                ) : (
                    <span className="material-symbols-rounded">person</span>
                )}
            </div>
            <div className="friend-page-username">{username || "username"}</div>
        </div>
    );
};

export default FriendPageAvatarAndUsername;
