import React, { useState, useEffect } from "react";
import "../styles/profile.css";
import { useSelector } from "react-redux";
import useLogout from "../utils/useLogout";

const Profile = () => {
    const userData = useSelector((state) => state.userDataSlice);

    const [displayNote, setDisplayNote] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [avatarError, setAvatarError] = useState(false);

    const logout = useLogout();

    // Set avatar URL initially from the store and update on changes
    useEffect(() => {
        if (userData?.userProfileDetails?.avatar) {
            setAvatarUrl(userData.userProfileDetails.avatar);
        }
    }, [userData]);

    // Fallback function if the avatar fails to load
    const handleImageError = () => {
        setAvatarError(true);
    };

    return (
        <div>
            <div className="profile-card-container">
                <div className="profile-card">
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
                            <span className="material-symbols-rounded">
                                edit
                            </span>
                        </div>
                    </div>
                    <div className="details-container">
                        <div className="username-container detail">
                            <div>Username:</div>
                            <div>
                                {userData?.userProfileDetails?.username || "-"}
                            </div>
                        </div>
                        <div className="email-container detail">
                            <div>Email:</div>
                            <div>
                                {userData?.userProfileDetails?.email ||
                                    "Email not provided"}
                            </div>
                            <div
                                className="google-ico-container"
                                onMouseEnter={() => {
                                    setDisplayNote(true);
                                }}
                                onMouseLeave={() => {
                                    setDisplayNote(false);
                                }}
                            >
                                {userData?.userProfileDetails
                                    ?.isGoogleLogin && (
                                    <img
                                        className="signed-in-with-google"
                                        src="https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png"
                                        alt=""
                                    />
                                )}

                                {displayNote && (
                                    <div className="note-container">
                                        You have used Google to sign in
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="logout-btn-container">
                        <button className="logout-btn" onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
