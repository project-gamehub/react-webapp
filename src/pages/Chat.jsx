import React, { useEffect } from "react";
import ChatList from "../components/chatPageComponents/ChatList";
import "../styles/chatPageStyles/chatPage.css";
import Conversation from "../components/chatPageComponents/Conversation";
import socket from "../utils/getSocket";
import { useDispatch, useSelector } from "react-redux";
import { receiveMessage } from "../config/chatSlice";

const Chat = () => {
    const accessToken = useSelector((state) => state.userDataSlice.accessToken);
    const dispatch = useDispatch();
    if (!accessToken) {
        // TODO - if user is not login in any page that requires login, redirect user to login page
        throw new Error("User not logged in");
    }
    useEffect(() => {
        socket.emit("join-room", { accessToken }, (response) => {
            // TODO - keep retry to join room
            if (response.error) {
                console.error("Error joining room:", response.message);
            } else {
            }
        });
        socket.on("receive-message", (data) => {
            dispatch(
                receiveMessage({
                    senderId: data.senderId,
                    messageContent: data.messageContent,
                    timestamp: data.timestamp
                })
            );
        });

        return () => {
            socket.off("receive-message");
            socket.off("join-room");
        };
    }, [accessToken, dispatch]);
    return (
        <div className="chat-page">
            <ChatList />
            <Conversation />
        </div>
    );
};

export default Chat;
