import ChatList from "../components/chatPageComponents/ChatList";
import "../styles/chatPageStyles/chatPage.css";
import Conversation from "../components/chatPageComponents/Conversation";
import { useEffect } from "react";

const Chat = () => {
    useEffect(() => {
        document.title = "Chat - GameHub";
    }, []);

    return (
        <div className="chat-page">
            <ChatList />
            <Conversation />
        </div>
    );
};

export default Chat;
