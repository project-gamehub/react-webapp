const RejectRequestButton = ({ userId }) => {
    const handleStopPropagation = (e) => {
        e.stopPropagation();
    };
    return (
        <div
            onClick={handleStopPropagation}
            className="friend-page-action-button friend-page-button-hover-red"
        >
            <span className="material-symbols-rounded">close</span>
        </div>
    );
};

export default RejectRequestButton;
