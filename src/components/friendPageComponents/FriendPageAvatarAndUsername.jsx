import React from "react";

const FriendPageAvatarAndUsername = ({ userId }) => {
    return (
        <div className="friend-page-tile-avatar-and-username disp-flx">
            <div className="friend-page-avatar">.</div>
            <div className="friend-page-username">{userId || "username"}</div>
        </div>
    );
};

export default FriendPageAvatarAndUsername;
