import React from "react";
import { useParams } from "react-router-dom";
import "../../styles/chatPageStyles/conversation.css";
import ConversationUserDetails from "./ConversationUserDetails";
import ConversationTextbox from "./ConversationTextbox";
import ConversationMessagesSection from "./ConversationMessagesSection";

const Conversation = () => {
    const { otherUserId } = useParams();

    return (
        <div className="conversation-section">
            {!otherUserId ? (
                <div className="conversation-section-landing">
                    <span className="material-symbols-rounded">chat</span>
                    <div>Chat with your friends</div>
                </div>
            ) : (
                <>
                    <ConversationUserDetails userId={otherUserId} />
                    <ConversationMessagesSection otherUserId={otherUserId} />
                    <ConversationTextbox userId={otherUserId} />
                </>
            )}
        </div>
    );
};

export default Conversation;
