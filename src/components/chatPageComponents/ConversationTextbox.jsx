import React, { useState } from "react";

const ConversationTextbox = ({ userId }) => {
    const [message, setMessage] = useState("");

    const handleMessageSend = () => {
        // TODO - Write send message logic
        console.log("Message sent", message);
        setMessage("");
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
