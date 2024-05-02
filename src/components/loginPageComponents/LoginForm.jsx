import { useState } from "react";
import "../../styles/loginPageStyles/loginAndRegistrationForm.css";
import { toast } from "react-toastify";
import {
    isValidPassword,
    isValidEmail
} from "../../utils/validators/validatorIndex.js";
import axios from "axios";
import { USER_SERVICE_URL } from "../../utils/constant.js";
import handleAccessToken from "../../utils/handleAccessToken.js";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [inputs, setInputs] = useState({});

    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        if (!isValidEmail(inputs.email)) {
            toast.error("Email is not valid");
            return;
        }
        const passwordErr = isValidPassword(inputs.password)
        if (passwordErr) {
            toast.error(passwordErr);
            return;
        }

        try {
            const res = await axios.post(USER_SERVICE_URL + "/login", {
                email: inputs.email,
                password: inputs.password
            });

            if (!res?.data?.data["access-token"]) {
                throw new Error("Something went wrong at server side");
            }
            handleAccessToken(res.data.data["access-token"]);
            
            // TODO - Set isLogin true

            toast.success("Logged in successfully");
            navigate("/");
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    error?.message ||
                    "Something went wrong"
            );
        }
    };

    return (
        <>
            <h1> Login</h1>
            <form onSubmit={handleLoginSubmit} className="form-container">
                <div className="input-container">
                    <div className="label-icon-container">
                        <span className="material-symbols-rounded label-icon">
                            person
                        </span>
                    </div>
                    <input
                        placeholder="Email"
                        className="input-field"
                        type="text"
                        name="email"
                        value={inputs.email || ""}
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
                <button className="submit-btn" type="submit">
                    Login
                </button>
            </form>
        </>
    );
};

export default LoginForm;
