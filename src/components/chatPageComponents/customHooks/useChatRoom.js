// src/hooks/useChatRoom.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../../utils/getChatSocket";
import { receiveMessage } from "../../../config/chatSlice";

const useChatRoom = () => {
    const accessToken = useSelector((state) => state.userDataSlice.accessToken);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!accessToken) {
            // TODO - if user is not login in any page that requires login, redirect user to login page
            throw new Error("User not logged in");
        }

        socket.emit("join-room", { accessToken }, (response) => {
            if (response.error) {
                console.error("Error joining room:", response.message);
                // TODO- retry if failed to join
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
};

export default useChatRoom;
