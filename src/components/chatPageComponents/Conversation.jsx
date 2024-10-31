import React from "react";
import { useParams } from "react-router-dom";
import "../../styles/chatPageStyles/conversation.css";
import ConversationUserDetails from "./ConversationUserDetails";
import ConversationTextbox from "./ConversationTextbox";

const Conversation = () => {
    const { otherUserId } = useParams();
    // TODO - If no otherUserId is present, show nothing

    return (
        <div className="conversation-section">
            <ConversationUserDetails userId={otherUserId} />
            <div className="conversation-message-section">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                nihil voluptate tempora quae ad, debitis eote. Esse hic quos
                doloremque nescut.
            </div>
            <ConversationTextbox userId={otherUserId} />
        </div>
    );
};

export default Conversation;
