import React from "react";
import { NavLink, useParams } from "react-router-dom";
import FriendReqStatusButton from "./FriendReqStatusButton";

const UserPageButtonsContainer = () => {
    const userId = useParams().userId;
    return (
        <div className="user-page-buttons-container">
            <NavLink className={"user-page-button"} to={"/chat/" + userId}>
                <span className="material-symbols-rounded">chat</span> Send
                Message
            </NavLink>
            <FriendReqStatusButton />
        </div>
    );
};

export default UserPageButtonsContainer;
