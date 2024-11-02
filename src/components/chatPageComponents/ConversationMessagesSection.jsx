import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversation } from "../../config/chatSlice";
import "../../styles/chatPageStyles/conversationMessage.css";
import MessageBubble from "./MessageBubble";
import isOthersMessage from "./customHooks/isOthersMessage";

const ConversationMessagesSection = ({ otherUserId }) => {
    const { conversation, conversationDataLoading, conversationDataError } =
        useSelector((state) => {
            return state.chatsDataSlice;
        });

    const dispatch = useDispatch();

    const currentConversationMessages = conversation[otherUserId];

    // TODO - Implement Pagination
    useEffect(() => {
        if (!currentConversationMessages) {
            dispatch(fetchConversation(otherUserId));
        }
    }, [dispatch, otherUserId, currentConversationMessages]);

    if (conversationDataError) {
        return <div>Error Fetching Messages</div>;
    } else if (conversationDataLoading) {
        // TODO - Add Shimmer
        return <div>Loading Messages</div>;
    }

    return (
        <div className="conversation-message-section">
            {currentConversationMessages &&
                [...currentConversationMessages]
                    .reverse()
                    .map((message, idx) => {
                        return (
                            <MessageBubble
                                key={message._id || idx}
                                othersMessage={isOthersMessage(
                                    message.senderId,
                                    otherUserId
                                )}
                                content={message.content}
                                timestamp={message.timestamp}
                                sending={message.sending}
                            />
                        );
                    })}
        </div>
    );
};

export default ConversationMessagesSection;
