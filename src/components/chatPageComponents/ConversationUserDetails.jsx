import React, { useEffect, useState } from "react";
import { USER_SERVICE_URL } from "../../utils/constant";
import axios from "axios";
import { toast } from "react-toastify";

const ConversationUserDetails = ({ userId }) => {
    const [username, setUsername] = useState(undefined);
    useEffect(() => {
        axios
            .get(USER_SERVICE_URL + "/get-username-by-id/" + userId)
            .then((res) => {
                setUsername(res?.data?.data?.username);
            })
            .catch((e) => {
                toast.error(e?.response?.data?.message || e.message);
            });
    }, [userId]);

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
