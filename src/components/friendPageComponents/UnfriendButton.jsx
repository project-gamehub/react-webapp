const UnfriendButton = ({ setShowConfirmInterface }) => {
    const handleUnfriendClick = (e) => {
        e.stopPropagation();
        setShowConfirmInterface(true);
    };

    return (
        <div
            onClick={handleUnfriendClick}
            className="friend-page-action-button friend-page-button-hover-red"
        >
            <span className="material-symbols-rounded">person_remove</span>
        </div>
    );
};

export default UnfriendButton;
