import "../styles/profile.css";
import { useSelector } from "react-redux";
import LogoutButton from "../components/profilePageComponents/LogoutButton";
import PfpContainer from "../components/profilePageComponents/PfpContainer";
import GoogleDisplayNote from "../components/profilePageComponents/GoogleDisplayNote";

const Profile = () => {
    const userData = useSelector((state) => state.userDataSlice);

    return (
        <div className="profile-card-container">
            <div className="profile-card">
                <PfpContainer />
                <div className="details-container">
                    <div className="username-container detail">
                        <div>Username:</div>
                        <div>
                            {userData?.userProfileDetails?.username || "-"}
                        </div>
                    </div>
                    <div className="email-container detail">
                        <div>Email:</div>
                        <div>
                            {userData?.userProfileDetails?.email ||
                                "Email not provided"}
                        </div>
                        <GoogleDisplayNote
                            isGoogleLogin={
                                userData?.userProfileDetails?.isGoogleLogin
                            }
                        />
                    </div>
                </div>
                <LogoutButton />
            </div>
        </div>
    );
};

export default Profile;
