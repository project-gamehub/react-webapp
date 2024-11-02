import React from "react";

const MessageStatus = ({ sending }) => {
    return (
        <div className="message-status">
            {sending === undefined || sending === "false" ? (
                <span className="material-symbols-rounded">check</span>
            ) : sending === "true" ? (
                <span className="material-symbols-rounded">schedule</span>
            ) : (
                <span className="material-symbols-rounded">error</span>
            )}
        </div>
    );
};

export default MessageStatus;
