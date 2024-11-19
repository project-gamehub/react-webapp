const CloseEditPfpInterface = ({ setShowEditPfpInterface }) => {
    return (
        <div className="close-edit-pfp-interface">
            <div className="close-edit-pfp-heading">Edit Profile Picture</div>
            <div className="edit-pfp-close-button pfp-button">
                <span
                    onClick={() => setShowEditPfpInterface(false)}
                    className="material-symbols-rounded"
                >
                    close
                </span>
            </div>
        </div>
    );
};

export default CloseEditPfpInterface;
