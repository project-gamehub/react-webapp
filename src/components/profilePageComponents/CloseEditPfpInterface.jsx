const CloseEditPfpInterface = ({ setShowEditPfpInterface }) => {
    return (
        <div className="edit-pfp-close-button pfp-button">
            <span
                onClick={() => setShowEditPfpInterface(false)}
                className="material-symbols-rounded"
            >
                close
            </span>
        </div>
    );
};

export default CloseEditPfpInterface;
