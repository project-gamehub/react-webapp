import GoogleDisplayNote from "./GoogleDisplayNote";
import { useSelector } from "react-redux";

const UserDetails = () => {
    const userData = useSelector((state) => state.userDataSlice);

    return (
        <div className="details-container">
            <div className="username-container detail">
                <div>Username:</div>
                <div>{userData?.userProfileDetails?.username || "-"}</div>
            </div>
            <div className="email-container detail">
                <div>Email:</div>
                <div>
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
