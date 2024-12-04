import UserPageButtonsContainer from "../components/userPageComponents/UserPageButtonsContainer";
import UserPagePfpContainer from "../components/userPageComponents/UserPagePfpContainer";
import UserPageUserDetails from "../components/userPageComponents/UserPageUserDetails";
import "../styles/profilePageStyles/profile.css";
import "../styles/userPageStyles/userPage.css";

const User = () => {
    return (
        <div className="disp-flx">
            <div className="user-page-profile-card">
                <UserPagePfpContainer />
                <div className="user-page-components">
                    <UserPageUserDetails />
                    <UserPageButtonsContainer />
                </div>
            </div>
        </div>
    );
};

export default User;
