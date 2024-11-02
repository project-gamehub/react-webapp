import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversation } from "../../config/chatSlice";
import "../../styles/chatPageStyles/conversationMessage.css";
import MessageBubble from "./MessageBubble";

const ConversationMessagesSection = ({ userId }) => {
    const { conversation, conversationDataLoading, conversationDataError } =
        useSelector((state) => {
            return state.chatsDataSlice;
        });

    const dispatch = useDispatch();

    const currentConversationMessages = conversation[userId];

    // TODO - Implement Pagination
    useEffect(() => {
        if (!currentConversationMessages) {
            dispatch(fetchConversation(userId));
        }
    }, [dispatch, userId, currentConversationMessages]);

    if (conversationDataError) {
        return <div>Error Fetching Messages</div>;
    } else if (conversationDataLoading) {
        // TODO - Add Shimmer
        return <div>Loading Messages</div>;
    }

    const isMyMessage = (senderId) => {
        if (senderId === userId) {
            return false;
        }
        return true;
    };

    return (
        <div className="conversation-message-section">
            {currentConversationMessages &&
                [...currentConversationMessages].reverse().map((message) => {
                    return (
                        <MessageBubble
                            key={message._id}
                            selfMessage={isMyMessage(message.senderId)}
                            content={message.content}
                            timestamp={message.timestamp}
                        />
                    );
                })}
        </div>
    );
};

export default ConversationMessagesSection;
