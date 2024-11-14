import useAvatar from "../../utils/useAvatar";
import useUsername from "../../utils/useUsername";

const ConversationUserDetails = ({ userId }) => {
    const username = useUsername(userId);
    const userAvatarURL = useAvatar(userId);

    return (
        <div className="conversation-user-details">
            {/* TODO - Implement the task: When this avatar or username is clicked, the users profile opens */}
            <div className="conversation-user-avatar-container">
                {userAvatarURL && (
                    <img
                        src={userAvatarURL}
                        alt={`${userId}'s avatar`}
                        className="conversation-user-avatar"
                    />
                )}
            </div>
            <div className="conversation-username">
                {username
                    ? username
                    : // TODO - Add Shimmer Here
                      "Loading..."}
            </div>
        </div>
    );
};

export default ConversationUserDetails;
