import React, { useState } from "react";
import GoogleLoginComponent from "../components/loginPageComponents/GoogleLoginComponent";
import { LOGIN_PAGE_BANNER_URL } from "../utils/constant";
import "../styles/loginPageStyles/loginPage.css";
import RegistrationForm from "../components/loginPageComponents/RegistrationForm";
import LoginForm from "../components/loginPageComponents/LoginForm";

// TODO find for {" "} and replace with nothing

const Login = () => {
    const [wantsToRegister, setWantsToRegister] = useState(false);
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
                    <h1>{wantsToRegister ? "Register" : "Login"}</h1>

                    {wantsToRegister ? <RegistrationForm /> : <LoginForm />}

                    <div class="line-container">
                        <div class="line"></div>
                        <div class="or-text">OR</div>
                        <div class="line"></div>
                    </div>

                    <GoogleLoginComponent />
                    <button
                        type="button"
                        className="toggle-login-register-btn"
                        onClick={() => setWantsToRegister(!wantsToRegister)}
                    >
                        {wantsToRegister ? (
                            <>
                                Already have an account? <span>Click to Login</span>
                            </>
                        ) : (
                            <>
                                Don't have an account? <span>Click to Register</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
