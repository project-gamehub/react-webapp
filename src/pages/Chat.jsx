import ChatList from "../components/chatPageComponents/ChatList";
import "../styles/chatPageStyles/chatPage.css";
import Conversation from "../components/chatPageComponents/Conversation";
import { useEffect } from "react";
import useChatRoom from "../components/chatPageComponents/customHooks/useChatRoom";

const Chat = () => {
    useChatRoom();

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
