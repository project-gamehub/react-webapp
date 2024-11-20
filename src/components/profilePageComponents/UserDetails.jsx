import GoogleDisplayNote from "./GoogleDisplayNote";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/profilePageStyles/editUsername.css";
import { useEffect, useRef, useState } from "react";
import isInvalidUsername from "../../utils/authFunctionsAndHooks/validators/isInvalidUsername";
import { toast } from "react-toastify";
import axios from "axios";
import { USER_SERVICE_URL } from "../../utils/constant";
import { updateUsername } from "../../config/userDataSlice";

const UserDetails = () => {
    const userData = useSelector((state) => state.userDataSlice);
    const [showEditUsernameInterface, setShowEditUsernameInterface] =
        useState(false);

    const [currentUsername, setCurrentUsername] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (userData?.userProfileDetails?.username) {
            setCurrentUsername(userData?.userProfileDetails?.username);
        }
    }, [userData?.userProfileDetails?.username]);

    useEffect(() => {
        if (showEditUsernameInterface && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showEditUsernameInterface]);

    const handleUsernameChange = (e) => {
        setCurrentUsername(e.target.value);
    };

    const accessToken = useSelector((state) => state.userDataSlice.accessToken);
    const dispatch = useDispatch();

    const handleEditUsername = async () => {
        const isInvalidUsernameError = isInvalidUsername(currentUsername);
        if (isInvalidUsernameError) {
            toast.error(isInvalidUsernameError);
            return;
        }

        if (userData?.userProfileDetails?.username === currentUsername) {
            toast.error("New username must be different from current one");
            return;
        }

        if (!accessToken) {
            toast.error("User not logged in");
            return;
        }

        try {
            await axios.patch(
                USER_SERVICE_URL + "/update",
                {
                    username: currentUsername
                },
                {
                    headers: {
                        "access-token": accessToken
                    }
                }
            );

            toast.success("Username updated successfully");
            dispatch(updateUsername(currentUsername));
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Username update failed"
            );
        }
    };

    return (
        <div className="details-container">
            <div className="username-container detail">
                <div className="user-details">Username:</div>
                {showEditUsernameInterface ? (
                    <>
                        <div className="user-details profile-page-username-input-container">
                            <input
                                ref={inputRef}
                                onChange={handleUsernameChange}
                                className="edit-username-input"
                                value={currentUsername}
                                type="text"
                            />
                        </div>
                        <div className="edit-username-action-buttons-container">
                            <div
                                onClick={() =>
                                    setShowEditUsernameInterface(false)
                                }
                                className="edit-username-action-button edit-username-close-button"
                            >
                                <span className="material-symbols-rounded">
                                    close
                                </span>
                            </div>
                            <div
                                onClick={handleEditUsername}
                                className="edit-username-action-button edit-username-upload-button"
                            >
                                <span className="material-symbols-rounded">
                                    check
                                </span>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="user-details profile-page-username-container">
                            {userData?.userProfileDetails?.username || "-"}
                        </div>
                        <div className="edit-username-action-buttons-container">
                            <div
                                onClick={() =>
                                    setShowEditUsernameInterface(true)
                                }
                                className="edit-username-action-button edit-username-open-button"
                            >
                                <span className="material-symbols-rounded">
                                    edit
                                </span>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="email-container detail">
                <div className="user-details">Email:</div>
                <div className="user-details">
                    {userData?.userProfileDetails?.email ||
                        "Email not provided"}
                </div>
                <GoogleDisplayNote
                    isGoogleLogin={userData?.userProfileDetails?.isGoogleLogin}
                />
            </div>
        </div>
    );
};

export default UserDetails;
