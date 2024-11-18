import "../../styles/chatPageStyles/chatTile.css";
import trimString from "./customHooks/trimString";
import useISTFormat from "./customHooks/useISTFormat";
import { NavLink } from "react-router-dom";
import useUsername from "../../utils/useUsername";
import useAvatar from "../../utils/useAvatar";

const ChatTile = ({ chatData }) => {
    const trimmedLastMessage = trimString(chatData?.lastMessage);
    const formattedTime = useISTFormat(chatData?.lastMessageTimestamp);
    const username = useUsername(chatData?.otherUserId);
    const userAvatarURL = useAvatar(chatData?.otherUserId);

    return (
        <NavLink
            to={`/chat/${chatData.otherUserId}`}
            className={"chat-tile-navlink"}
        >
            <div className="chat-tile">
                <div className="chat-tile-avatar-container">
                    {userAvatarURL && (
                        <img
                            src={userAvatarURL}
                            alt={`${chatData?.otherUserId}'s avatar`}
                            className="chat-tile-avatar"
                        />
                    )}
                </div>
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
                            · {formattedTime}
                        </span>
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

export default ChatTile;
