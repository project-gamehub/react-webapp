import { useState } from "react";
import { useSelector } from "react-redux";
import EditPfp from "./EditPfp";
import { DEFAULT_PFP_URL } from "../../utils/constant";

const PfpContainer = () => {
    const avatarUrl = useSelector(
        (state) => state.userDataSlice?.userProfileDetails?.avatar
    );
    const [avatarError, setAvatarError] = useState(false);

    const handleImageError = () => {
        setAvatarError(true);
    };

    const [showEditPfpInterface, setShowEditPfpInterface] = useState(false);

    return (
        <div className="pfp-container-component">
            <div className="pfp-container">
                <img
                    className="pfp-img"
                    src={
                        avatarError || !avatarUrl ? DEFAULT_PFP_URL : avatarUrl
                    }
                    alt="User's Profile Pic"
                    onError={handleImageError}
                />
            </div>
            <div className="pfp-edit-button pfp-button">
                <span
                    onClick={() => setShowEditPfpInterface(true)}
                    className="material-symbols-rounded"
                >
                    edit
                </span>
            </div>

            {showEditPfpInterface && (
                <EditPfp setShowEditPfpInterface={setShowEditPfpInterface} />
            )}
        </div>
    );
};

export default PfpContainer;
