import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Shimmer from "../Shimmer";
import { useState } from "react";

const UserProfileNavbarButton = () => {
    const { userProfileDetails, isLogin, userDataLoading } = useSelector(
        (state) => state.userDataSlice
    );

    const [avatarError, setAvatarError] = useState(false);

    const handleImageError = () => {
        setAvatarError(true);
    };

    return (
        <div className="profile-container">
            {isLogin ? (
                <NavLink className="navbar-link" to="/profile">
                    {userDataLoading ? (
                        <div className="navbar-profile-pic">
                            <Shimmer />
                        </div>
                    ) : !avatarError && userProfileDetails?.avatar ? (
                        <img
                            className="navbar-profile-pic"
                            src={userProfileDetails?.avatar}
                            alt="User Profile Pic"
                            onError={handleImageError}
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
