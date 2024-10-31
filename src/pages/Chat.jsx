import React from "react";
import ChatList from "../components/chatPageComponents/ChatList";
import "../styles/chatPageStyles/chatPage.css";

const Chat = () => {
    return (
        <div className="chat-page">
            <ChatList />
            <div className="conversation-section">Conversation</div>
        </div>
    );
};

export default Chat;
