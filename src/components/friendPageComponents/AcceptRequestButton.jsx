const AcceptRequestButton = ({ userId }) => {
    const handleStopPropagation = (e) => {
        e.stopPropagation();
    };
    return (
        <div
            onClick={handleStopPropagation}
            className="friend-page-action-button friend-page-button-hover-green"
        >
            <span className="material-symbols-rounded">check</span>
        </div>
    );
};

export default AcceptRequestButton;
