import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/chatPageStyles/conversation.css";
import ConversationUserDetails from "./ConversationUserDetails";
import ConversationTextbox from "./ConversationTextbox";
import ConversationMessagesSection from "./ConversationMessagesSection";

const Conversation = () => {
    const { otherUserId } = useParams();
    const [showConversation, setShowConversation] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            const isSmallScreen =
                window.matchMedia("(max-width: 765px)").matches;
            if (isSmallScreen) {
                if (!otherUserId) {
                    setShowConversation(false);
                } else {
                    setShowConversation(true);
                }
            } else {
                setShowConversation(true);
            }
        };
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [otherUserId]);

    return (
        showConversation && (
            <div className="conversation-section">
                {!otherUserId ? (
                    <div className="conversation-section-landing">
                        <span className="material-symbols-rounded">chat</span>
                        <div>Chat with your friends</div>
                    </div>
                ) : (
                    <>
                        <ConversationUserDetails userId={otherUserId} />
                        <ConversationMessagesSection
                            otherUserId={otherUserId}
                        />
                        <ConversationTextbox userId={otherUserId} />
                    </>
                )}
            </div>
        )
    );
};

export default Conversation;
