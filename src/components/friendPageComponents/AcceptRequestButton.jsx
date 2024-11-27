import useAcceptRequest from "../../utils/useAcceptRequest";

const AcceptRequestButton = ({ userId }) => {
    const handleAcceptRequest = useAcceptRequest();
    return (
        <div
            onClick={() => handleAcceptRequest(userId)}
            className="friend-page-action-button friend-page-button-hover-green"
        >
            <span className="material-symbols-rounded">check</span>
        </div>
    );
};

export default AcceptRequestButton;
