import React, { useState } from "react";
import "../../styles/loginPageStyles/loginAndRegistrationForm.css";
import {
    isValidPassword,
    isValidEmail,
    isInvalidUsername
} from "../../utils/validators/validatorIndex.js";
import { toast } from "react-toastify";
import axios from "axios";
import { USER_SERVICE_URL } from "../../utils/constant.js";
import handleAccessToken from "../../utils/handleAccessToken.js";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
    const [inputs, setInputs] = useState({});

    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    // TODO - Implement debouncing for username

    const handleRegisterFormSubmit = async (event) => {
        event.preventDefault();
        if(!isValidEmail(inputs.email)){
            toast.error("Email is not valid");
            return;
        }
        const usernameError = isInvalidUsername(inputs.username);
        if(usernameError){
            toast.error(usernameError);
            return;
        }
        if(inputs.password !== inputs.confirmPassword){
            toast.error("Passwords don't match");
            return;
        }
        const passwordErr = isValidPassword(inputs.password)
        if (passwordErr) {
            toast.error(passwordErr);
            return;
        }
        try {
            const res = await axios.post(USER_SERVICE_URL + "/signup", {
                email: inputs.email,
                password: inputs.password,
                username: inputs.username
            })
            if(!res?.data?.data["access-token"]){
                throw new Error("Something went wrong at server side");
            }
            handleAccessToken(res.data.data["access-token"]);
            toast.success("Registered successfully");
            navigate("/");
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    error?.message ||
                    "Something went wrong"
            )
        }
    };

    return (
        <>
            <h1>Register</h1>
            <form className="form-container" onSubmit={handleRegisterFormSubmit}>
                <div className="input-container">
                    <div className="label-icon-container">
                        <span className="material-symbols-rounded label-icon">
                            person
                        </span>
                    </div>
                    <input
                        placeholder="Email"
                        className="input-field"
                        type="email"
                        name="email"
                        value={inputs.email || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-container">
                    <div className="label-icon-container">
                        <span className="material-symbols-rounded label-icon">
                            alternate_email
                        </span>
                    </div>
                    <input
                        placeholder="Username"
                        className="input-field"
                        type="text"
                        name="username"
                        value={inputs.username || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-container">
                    <div className="label-icon-container">
                        <span className="material-symbols-rounded label-icon">
                            lock
                        </span>
                    </div>
                    <input
                        placeholder="Password"
                        className="input-field"
                        type="password"
                        name="password"
                        value={inputs.password || ""}
                        onChange={handleChange}
                    />
                </div>
                {/* TODO - Add show/Hide password feature */}
                <div className="input-container">
                    <div className="label-icon-container">
                        <span className="material-symbols-rounded label-icon">
                            lock
                        </span>
                    </div>
                    <input
                        placeholder="Confirm password"
                        className="input-field"
                        type="password"
                        name="confirmPassword"
                        value={inputs.confirmPassword || ""}
                        onChange={handleChange}
                    />
                </div>
                <button className="submit-btn" type="submit">
                    Register
                </button>
            </form>
        </>
    );
};

export default RegistrationForm;
