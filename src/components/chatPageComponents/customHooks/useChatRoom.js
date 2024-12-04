import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../../utils/getChatSocket";
import { receiveMessage } from "../../../config/chatSlice";
import { toast } from "react-toastify";

let isChatRoomActive = false;

const useChatRoom = () => {
    const accessToken = useSelector((state) => state.userDataSlice.accessToken);
    const dispatch = useDispatch();
    const cleanupRef = useRef(false);

    useEffect(() => {
        if (!accessToken || isChatRoomActive) {
            toast.error("User not logged in!");
        }

        socket.emit("join-room", { accessToken }, (response) => {
            if (response.error) {
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
            if (!cleanupRef.current) {
                return; // Don't clean up on component unmount
            }

            socket.off("receive-message");
            socket.off("join-room");
        };
    }, [accessToken, dispatch]);

    const cancelChatRoom = () => {
        cleanupRef.current = true;
        socket.off("receive-message");
        socket.emit("leave-room", { accessToken });
        isChatRoomActive = false;
    };

    return { cancelChatRoom };
};

export default useChatRoom;
