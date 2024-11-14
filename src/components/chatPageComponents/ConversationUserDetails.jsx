import useUsername from "../../utils/useUsername";

const ConversationUserDetails = ({ userId }) => {
    const username = useUsername(userId);

    return (
        <div className="conversation-user-details">
            {/* TODO - Implement the task: When this avatar or username is clicked, the users profile opens */}
            {/* TODO - Instead of making new API call, use the details that are fetched in ChatTile component */}
            <div className="conversation-user-avatar"></div>
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
