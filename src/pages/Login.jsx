import React, { useState } from "react";
import GoogleLoginComponent from "../components/loginPageComponents/GoogleLoginComponent";
import { LOGIN_PAGE_BANNER_URL } from "../utils/constant";
import "../styles/loginPageStyles/loginPage.css";
import RegistrationForm from "../components/loginPageComponents/RegistrationForm";
import LoginForm from "../components/loginPageComponents/LoginForm";
import ResetPass from "../components/loginPageComponents/resetPass/ResetPass";

// TODO find for {" "} and replace with nothing

const Login = () => {
    const [wantsToRegister, setWantsToRegister] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);

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

                            <div className="forgot-pass-btn-container">
                                <button
                                    className="forgot-pass-btn"
                                    type="button"
                                    onClick={() => {
                                        setShowResetPassword(
                                            !showResetPassword
                                        );
                                    }}
                                >
                                    {showResetPassword ? (
                                        <>Back to login</>
                                    ) : (
                                        <>Forgot Password?</>
                                    )}
                                </button>
                            </div>
                        </>
                    )}

                    <div className="line-container">
                        <div className="line"></div>
                        <div className="or-text">OR</div>
                        <div className="line"></div>
                    </div>

                    <GoogleLoginComponent />
                    <button
                        type="button"
                        className="toggle-login-register-btn"
                        onClick={() => setWantsToRegister(!wantsToRegister)}
                    >
                        {wantsToRegister ? (
                            <>
                                Already have an account?&nbsp;
                                <span>Click to Login</span>
                            </>
                        ) : (
                            <>
                                Don't have an account?&nbsp;
                                <span>Click to Register</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
