import React, { useState } from "react";
import { useSelector } from "react-redux";

const PfpContainer = () => {
    const avatarUrl = useSelector(
        (state) => state.userDataSlice?.userProfileDetails?.avatar
    );
    const [avatarError, setAvatarError] = useState(false);

    const handleImageError = () => {
        setAvatarError(true);
    };

    return (
        <div>
            <div className="pfp-container">
                <img
                    className="pfp-img"
                    src={
                        avatarError || !avatarUrl
                            ? "https://static-00.iconduck.com/assets.00/user-circle-icon-2048x2048-lmkqor95.png"
                            : avatarUrl
                    }
                    alt="User's Profile Pic"
                    onError={handleImageError} // Handles image load error
                />
            </div>
            <div className="pfp-edit-button">
                <span className="material-symbols-rounded">edit</span>
            </div>
        </div>
    );
};

export default PfpContainer;
