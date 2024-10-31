import React, { useEffect, useState } from "react";
import "../../styles/chatPageStyles/chatTile.css";
import trimString from "./customHooks/trimString";
import useISTFormat from "./customHooks/useISTFormat";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { USER_SERVICE_URL } from "../../utils/constant";
import { toast } from "react-toastify";

const ChatTile = ({ chatData }) => {
    const trimmedLastMessage = trimString(chatData?.lastMessage);
    const formattedTime = useISTFormat(chatData?.lastMessageTimestamp);

    // TODO - Make it reusable by defining it in seperate custom hook
    const [username, setUsername] = useState(undefined);
    useEffect(() => {
        axios
            .get(
                USER_SERVICE_URL +
                    "/get-username-by-id/" +
                    chatData?.otherUserId
            )
            .then((res) => {
                setUsername(res?.data?.data?.username);
            })
            .catch((e) => {
                toast.error(e?.response?.data?.message || e.message);
            });
    }, []);
    {
        /* TODO- Get Avatar from userId */
    }

    return (
        <NavLink
            to={`/chat/${chatData.otherUserId}`}
            className={"chat-tile-navlink"}
        >
            <div className="chat-tile">
                <div className="chat-tile-avatar"></div>
                <div className="chat-tile-detils-container">
                    <div className="chat-tile-username-container">
                        {username
                            ? username
                            : // TODO - Add Shimmer Here
                              "Loading"}
                    </div>
                    <div className="chat-tile-content-container">
                        {trimmedLastMessage}
                        <span className="chat-tile-time-container">
                            {" "}
                            · {formattedTime}
                        </span>
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

export default ChatTile;
