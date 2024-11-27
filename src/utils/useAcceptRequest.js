import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { FRIENDS_SERVICE_URL } from "./constant";
import { addFriend, removeIncomingRequest } from "../config/friendsDataSlice";

const useAcceptRequest = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.userDataSlice.accessToken);

    const handleAcceptRequest = async (userId) => {
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
            toast.success("Friend request accepted!");
        } catch (error) {
            toast.error("Failed to accept request");
            throw new error(error);
        }
    };

    return handleAcceptRequest;
};

export default useAcceptRequest;
