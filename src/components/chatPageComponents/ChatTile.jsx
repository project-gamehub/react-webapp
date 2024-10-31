import React from "react";
import "../../styles/chatPageStyles/chatTile.css";
import trimString from "./customHooks/trimString";
import useISTFormat from "./customHooks/useISTFormat";
import { Link, NavLink } from "react-router-dom";

const ChatTile = ({ chatData }) => {
    console.log(chatData);
    const trimmedLastMessage = trimString(chatData?.lastMessage);
    const formattedTime = useISTFormat(chatData?.lastMessageTimestamp);
    {
        /* TODO- Get Avatar and username from userId */
    }
    return (
        <NavLink to={`${chatData.otherUserId}`} className={"chat-tile-navlink"}>
            <div className="chat-tile">
                <div className="chat-tile-avatar"></div>
                <div className="chat-tile-detils-container">
                    <div className="chat-tile-username-container">Username</div>
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
