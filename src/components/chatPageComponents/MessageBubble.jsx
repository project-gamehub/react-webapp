import React from "react";
import formatTimestampToIST from "./customHooks/formatTimestampToIST";
import MessageStatus from "./MessageStatus";

const MessageBubble = ({ othersMessage, content, timestamp, sending }) => {
    return (
        <div
            className={
                "message-bubble" + (othersMessage ? " others-message" : "")
            }
        >
            <div className="message-details-container">
                <div className="message-content">{content}</div>
                <div className="message-time-container">
                    <div className="message-time">
                        {formatTimestampToIST(timestamp)}
                    </div>
                    {!othersMessage && <MessageStatus sending={sending} />}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
