import { USER_SERVICE_URL } from "../../utils/constant";
import "../../styles/loginPageStyles/googleLoginComponent.css";
import GoogleIcon from "./GoogleIcon";

const GoogleLoginComponent = () => {
    const googleAuth = () => {
        window.open(`${USER_SERVICE_URL}/google-web-login/`, "_self");
    };

    return (
        <button onClick={googleAuth} className="gsi-material-button">
            <div className="gsi-material-button-state" />
            <div className="gsi-material-button-content-wrapper">
                <div className="gsi-material-button-icon">
                    <GoogleIcon />
                </div>
                <span className="gsi-material-button-contents">
                    Continue with Google
                </span>
                <span style={{ display: "none" }}>Continue with Google</span>
            </div>
        </button>
    );
};

export default GoogleLoginComponent;
