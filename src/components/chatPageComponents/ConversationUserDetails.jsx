import { Link, useNavigate } from "react-router-dom";
import useAvatar from "../../utils/useAvatar";
import useUsername from "../../utils/useUsername";

const ConversationUserDetails = ({ userId }) => {
    const username = useUsername(userId);
    const userAvatarURL = useAvatar(userId);
    const navigate = useNavigate();

    return (
        <>
            <div className="conversation-user-details">
                <div
                    onClick={() => {
                        navigate(-1);
                    }}
                    className="go-back-button disp-flx"
                >
                    <span className="material-symbols-rounded">arrow_back</span>
                </div>
                <Link
                    className="conversation-user-details-link"
                    to={"/user/" + userId}
                >
                    <div className="conversation-user-avatar-container disp-flx">
                        {userAvatarURL ? (
                            <img
                                src={userAvatarURL}
                                alt={`${userId}'s avatar`}
                                className="conversation-user-avatar"
                            />
                        ) : (
                            <span className="material-symbols-rounded">
                                person
                            </span>
                        )}
                    </div>
                    <div className="conversation-username">
                        {username
                            ? username
                            : // TODO - Add Shimmer Here
                              "Loading..."}
                    </div>
                </Link>
            </div>
        </>
    );
};

export default ConversationUserDetails;
