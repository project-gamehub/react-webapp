const RejectRequestButton = ({ userId }) => {
    const handleRejectRequest = () => {};

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
