import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Shimmer from "../Shimmer";

const UserProfileNavbarButton = () => {
    const { userProfileDetails, isLogin, userDataLoading } = useSelector(
        (state) => state.userDataSlice
    );

    const [avatarUrl, setAvatarUrl] = useState(null);
    const [avatarError, setAvatarError] = useState(false);

    useEffect(() => {
        if (userProfileDetails?.avatar) {
            setAvatarUrl(userProfileDetails.avatar);
        }
    }, [userProfileDetails]);

    const handleImageError = () => {
        setAvatarError(true); // fallback to icon when image fails
    };

    return (
        <div className="profile-container">
            {isLogin ? (
                <NavLink className="navbar-link" to="/profile">
                    {userDataLoading ? (
                        <div className="navbar-profile-pic">
                            <Shimmer />
                        </div>
                    ) : avatarUrl && !avatarError ? (
                        <img
                            className="navbar-profile-pic"
                            src={avatarUrl}
                            alt="User Profile Pic"
                            onError={handleImageError} // Fallback in case of error
                        />
                    ) : (
                        <span className="material-symbols-rounded">person</span>
                    )}
                    <div className="nav-label">
                        {userDataLoading ? (
                            <Shimmer />
                        ) : (
                            userProfileDetails?.username || "username"
                        )}
                    </div>
                </NavLink>
            ) : (
                <NavLink className="navbar-link" to="/auth/login">
                    <span className="material-symbols-rounded explore-btn">
                        login
                    </span>
                    <div className="nav-label">Login</div>
                </NavLink>
            )}
        </div>
    );
};

export default UserProfileNavbarButton;
