import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FRIENDS_SERVICE_URL } from "../../utils/constant";
import axios from "axios";
import { removeIncomingRequest } from "../../config/friendsDataSlice";

const RejectRequestButton = ({ userId }) => {
    const accessToken = useSelector((state) => state.userDataSlice.accessToken);
    const dispatch = useDispatch();

    const handleRejectRequest = async () => {
        if (!accessToken) {
            toast.error("User not logged in");
            return;
        }
        try {
            await axios.delete(
                `${FRIENDS_SERVICE_URL}/reject-incoming-request/${userId}`,
                {
                    headers: {
                        "access-token": accessToken
                    }
                }
            );
            dispatch(removeIncomingRequest(userId));
            toast.success("Request rejected successfully");
        } catch (error) {
            toast.error("Fail to reject request");
        }
    };

    return (
        <div
            onClick={handleRejectRequest}
            className="friend-page-action-button friend-page-button-hover-red"
        >
            <span className="material-symbols-rounded">close</span>
        </div>
    );
};

export default RejectRequestButton;
