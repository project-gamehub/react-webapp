import useUsername from "../../utils/useUsername";
import { useParams } from "react-router-dom";

const UserPageUserDetails = () => {
    const userId = useParams().userId;

    const username = useUsername(userId);

    return (
        <div className="user-page-details-container disp-flx">
            <div className="user-details">Username:</div>
            <div className="user-details profile-page-username-container">
                {username || "username"}
            </div>
        </div>
    );
};

export default UserPageUserDetails;
