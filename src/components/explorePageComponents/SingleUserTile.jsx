import React from "react";
import { NavLink } from "react-router-dom";
import useAvatar from "../../utils/useAvatar";

const SingleUserTile = ({ userData }) => {
    const avatar = useAvatar(userData._id);
    return (
        <NavLink
            className={"search-page-single-tile"}
            to={"/user/" + userData._id}
        >
            <div className="search-page-avatar-container disp-flx">
                {avatar ? (
                    <img
                        src={avatar}
                        alt={userData.username + "'s Profile Pic"}
                    />
                ) : (
                    <span className="material-symbols-rounded">person</span>
                )}
            </div>
            <div>{userData.username}</div>
        </NavLink>
    );
};

export default SingleUserTile;
