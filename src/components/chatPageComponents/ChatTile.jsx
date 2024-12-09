import "../../styles/chatPageStyles/chatTile.css";
import useISTFormat from "./customHooks/useISTFormat";
import { NavLink } from "react-router-dom";
import useUsername from "../../utils/useUsername";
import useAvatar from "../../utils/useAvatar";

const ChatTile = ({ chatData, searchBarValue }) => {
    const formattedTime = useISTFormat(chatData?.lastMessageTimestamp);
    const username = useUsername(chatData?.otherUserId);
    const userAvatarURL = useAvatar(chatData?.otherUserId);

    if (
        searchBarValue === "" ||
        username.includes(searchBarValue.trim().toLowerCase())
    )
        return (
            <NavLink
                to={`/chat/${chatData.otherUserId}`}
                className={"chat-tile-navlink"}
            >
                <div className="chat-tile">
                    <div className="chat-tile-avatar-container disp-flx">
                        {userAvatarURL ? (
                            <img
                                src={userAvatarURL}
                                alt={`${chatData?.otherUserId}'s avatar`}
                                className="chat-tile-avatar"
                            />
                        ) : (
                            <span className="material-symbols-rounded">
                                person
                            </span>
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
                            <span className="chat-tile-last-message-container">
                                {chatData?.lastMessage}
                            </span>
                            <span className="chat-tile-time-container">
                                &nbsp; · {formattedTime}
                            </span>
                        </div>
                    </div>
                </div>
            </NavLink>
        );
};

export default ChatTile;
