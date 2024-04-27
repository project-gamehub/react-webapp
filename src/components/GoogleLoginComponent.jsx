import { USER_SERVICE_URL } from "../utils/constant";

const GoogleLoginComponent = () => {
    const googleAuth = () => {
        window.open(`${USER_SERVICE_URL}google-login`, "_self");
    };

    return <button onClick={googleAuth}>Login</button>;
};

export default GoogleLoginComponent;
