import React, { useEffect, useState } from "react";
import GoogleLoginComponent from "../components/loginPageComponents/GoogleLoginComponent";
import { LOGIN_PAGE_BANNER_URL } from "../utils/constant";
import "../styles/loginPageStyles/loginPage.css";
import RegistrationForm from "../components/loginPageComponents/RegistrationForm";
import LoginForm from "../components/loginPageComponents/LoginForm";
import ResetPass from "../components/loginPageComponents/resetPass/ResetPass";
import { useNavigate, useParams } from "react-router-dom";
import ToggleLoginRegisterButton from "../components/loginPageComponents/ToggleLoginRegisterButton";
import BreakingLineContainer from "../components/loginPageComponents/BreakingLineContainer";
import ForgotPassButtonContainer from "../components/loginPageComponents/ForgotPassButtonContainer";

// TODO find for {" "} and replace with nothing

const Auth = () => {
    const [wantsToRegister, setWantsToRegister] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);

    const { purpose } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (purpose === "login") {
            setWantsToRegister(false);
            setShowResetPassword(false);
        } else if (purpose === "register") {
            setWantsToRegister(true);
        } else if (purpose === "reset-pass") {
            setWantsToRegister(false);
            setShowResetPassword(true);
        } else {
            navigate("/auth/login");
        }
    }, [purpose, navigate]);

    return (
        <div className="login-page-container">
            <div className="login-components-container">
                <img
                    className="login-page-banner"
                    src={LOGIN_PAGE_BANNER_URL}
                    alt="Login Page Banner"
                />
                <div
                    className={
                        "components-container glass-effect " +
                        (wantsToRegister ? "abs-pos-left" : "abs-pos-right")
                    }
                >
                    {wantsToRegister ? (
                        <RegistrationForm />
                    ) : (
                        <>
                            {showResetPassword ? <ResetPass /> : <LoginForm />}

                            <ForgotPassButtonContainer
                                showResetPassword={showResetPassword}
                            />
                        </>
                    )}

                    <BreakingLineContainer />
                    <GoogleLoginComponent />
                    <ToggleLoginRegisterButton
                        wantsToRegister={wantsToRegister}
                    />
                </div>
            </div>
        </div>
    );
};

export default Auth;
