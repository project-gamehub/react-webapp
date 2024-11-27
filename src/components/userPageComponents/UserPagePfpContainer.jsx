import { useState } from "react";
import { useParams } from "react-router-dom";
import useAvatar from "../../utils/useAvatar";

const UserPagePfpContainer = () => {
    const userId = useParams().userId;

    const avatarUrl = useAvatar(userId);
    const [avatarError, setAvatarError] = useState(false);

    const handleImageError = () => {
        setAvatarError(true);
    };

    return (
        <div className="pfp-container-component">
            <div className="pfp-container disp-flx">
                {avatarUrl && !avatarError ? (
                    <img
                        className="pfp-img"
                        src={avatarUrl}
                        alt="User's Profile Pic"
                        onError={handleImageError}
                    />
                ) : (
                    <span className="material-symbols-rounded">person</span>
                )}
            </div>
        </div>
    );
};

export default UserPagePfpContainer;
