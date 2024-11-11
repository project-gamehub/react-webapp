import React from "react";
import ChatList from "../components/chatPageComponents/ChatList";
import "../styles/chatPageStyles/chatPage.css";
import Conversation from "../components/chatPageComponents/Conversation";

const Chat = () => {
    return (
        <div className="chat-page">
            <ChatList />
            <Conversation />
        </div>
    );
};

export default Chat;
