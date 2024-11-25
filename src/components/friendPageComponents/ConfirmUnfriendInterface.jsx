const ConfirmUnfriendInterface = ({ setShowConfirmInterface, userId }) => {
    const handleUnfriend = () => {};

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
