import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FRIENDS_SERVICE_URL } from "../../utils/constant";
import { removeFriend } from "../../config/friendsDataSlice";

const ConfirmUnfriendInterface = ({ setShowConfirmInterface, userId }) => {
    const accessToken = useSelector((state) => state.userDataSlice.accessToken);
    const dispatch = useDispatch();
    const handleUnfriend = async () => {
        if (!accessToken) {
            toast.error("User not logged in");
            return;
        }
        try {
            await axios.delete(`${FRIENDS_SERVICE_URL}/unfriend/${userId}`, {
                headers: {
                    "access-token": accessToken
                }
            });
            dispatch(removeFriend(userId));
            toast.success("Friend removed successfully");
        } catch (error) {
            toast.error("Error in removing friend");
        }
    };

    const handleStopPropagation = (e) => {
        e.stopPropagation();
    };
    return (
        <div
            onClick={handleStopPropagation}
            className="disp-flx friend-page-unfriend-interface-label"
        >
            <div>Confirm unfriend?</div>
            <div
                onClick={handleUnfriend}
                className="friend-page-chat-link friend-page-action-button friend-page-button-hover-green"
            >
                <span className="material-symbols-rounded">check</span>
            </div>
            <div
                onClick={() => {
                    setShowConfirmInterface(false);
                }}
                className="friend-page-action-button friend-page-button-hover-red"
            >
                <span className="material-symbols-rounded">close</span>
            </div>
        </div>
    );
};

export default ConfirmUnfriendInterface;
