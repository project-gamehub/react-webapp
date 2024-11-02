import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../config/chatSlice";

const ConversationTextbox = ({ userId }) => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const handleMessageSend = () => {
        if (message.trim()) {
            dispatch(
                sendMessage({ messageContent: message, otherUserId: userId })
            );
            setMessage("");
        }
    };

    const handleChangeMessageContent = (e) => {
        setMessage(e.target.value);
    };

    return (
        <div className="conversation-textbox">
            <input
                type="text"
                value={message}
                onChange={handleChangeMessageContent}
            />
            <button onClick={handleMessageSend}>
                <span className="material-symbols-rounded">send</span>
            </button>
        </div>
    );
};

export default ConversationTextbox;
