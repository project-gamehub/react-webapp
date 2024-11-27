import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FRIENDS_SERVICE_URL } from "../../utils/constant";
import useAcceptRequest from "../../utils/useAcceptRequest";

const FriendReqStatusButton = () => {
    const userId = useParams().userId;
    const accessToken = useSelector((state) => state.userDataSlice.accessToken);

    const [friendshipStatusCode, setFriendshipStatusCode] = useState(0);

    const handleSendRequest = async () => {
        try {
            await axios.patch(
                FRIENDS_SERVICE_URL + "/send-request/" + userId,
                {},
                {
                    headers: {
                        "access-token": accessToken
                    }
                }
            );
            setFriendshipStatusCode(2);
        } catch (error) {}
    };

    const handleCancelRequest = async () => {
        try {
            await axios.delete(
                FRIENDS_SERVICE_URL + "/cancel-outgoing-request/" + userId,
                {
                    headers: {
                        "access-token": accessToken
                    }
                }
            );
            setFriendshipStatusCode(-1);
        } catch (error) {}
    };

    const handleAcceptRequest = useAcceptRequest();

    const handleAccept = async () => {
        try {
            await handleAcceptRequest(userId);
            setFriendshipStatusCode(1);
        } catch (error) {}
    };

    useEffect(() => {
        const getFriendshipStatus = async () => {
            try {
                const response = await axios.get(
                    FRIENDS_SERVICE_URL + "/friendship-status/" + userId,
                    {
                        headers: {
                            "access-token": accessToken
                        }
                    }
                );
                setFriendshipStatusCode(
                    response?.data?.data?.friendshipStatusCode
                );
            } catch (error) {}
        };
        getFriendshipStatus();
    }, [userId, accessToken]);

    if (friendshipStatusCode === -1) {
        return (
            <div onClick={handleSendRequest} className={"user-page-button"}>
                Send Friend Request
            </div>
        );
    }

    if (friendshipStatusCode === 1) {
        return <div className={"user-page-button"}>You are friends</div>;
    }

    if (friendshipStatusCode === 2) {
        return (
            <div
                onClick={handleCancelRequest}
                className={"user-page-button cancel-outgoing-request-button"}
            >
                Requested<span>(Click to cancel outgoing request)</span>
            </div>
        );
    }

    if (friendshipStatusCode === 3) {
        return (
            <div onClick={handleAccept} className={"user-page-button"}>
                Accept Request
            </div>
        );
    }

    return <div className={"user-page-button"}>Loading...</div>;
};

export default FriendReqStatusButton;
