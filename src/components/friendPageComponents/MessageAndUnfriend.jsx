import { useNavigate } from "react-router-dom";
import UnfriendButton from "./UnfriendButton";
import { useState } from "react";
import ConfirmUnfriendInterface from "./ConfirmUnfriendInterface";

const MessageAndUnfriend = ({ userId }) => {
    const [showConfirmInterface, setShowConfirmInterface] = useState(false);
    const navigate = useNavigate();
    const handleStopPropagation = (e) => {
        e.stopPropagation();
    };

    if (!showConfirmInterface) {
        return (
            <div className="friend-page-msg-and-unfriend disp-flx">
                <div
                    onClick={(e) => {
                        handleStopPropagation(e);
                        navigate(`/chat/${userId}`);
                    }}
                    className="friend-page-chat-link friend-page-action-button friend-page-button-hover-blue"
                >
                    <span className="material-symbols-rounded">sms</span>
                </div>
                <UnfriendButton
                    setShowConfirmInterface={setShowConfirmInterface}
                />
            </div>
        );
    }

    return (
        <ConfirmUnfriendInterface
            setShowConfirmInterface={setShowConfirmInterface}
            userId={userId}
        />
    );
};

export default MessageAndUnfriend;
