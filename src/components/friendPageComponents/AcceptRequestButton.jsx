import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import {
    addFriend,
    removeIncomingRequest
} from "../../config/friendsDataSlice";
import { FRIENDS_SERVICE_URL } from "../../utils/constant";

const AcceptRequestButton = ({ userId }) => {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.userDataSlice.accessToken);

    const handleAcceptRequest = async () => {
        if (!accessToken) {
            toast.error("User not logged in");
            return;
        }
        try {
            await axios.patch(
                `${FRIENDS_SERVICE_URL}/accept-request/${userId}`,
                {},
                {
                    headers: {
                        "access-token": accessToken
                    }
                }
            );
            dispatch(removeIncomingRequest(userId));
            dispatch(addFriend(userId));
        } catch (error) {
            console.log(error);

            toast.error("Fail to accept request");
        }
    };
    return (
        <div
            onClick={handleAcceptRequest}
            className="friend-page-action-button friend-page-button-hover-green"
        >
            <span className="material-symbols-rounded">check</span>
        </div>
    );
};

export default AcceptRequestButton;
