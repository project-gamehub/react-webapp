import { useState } from "react";
import "../../styles/loginPageStyles/loginAndRegistrationForm.css";

const LoginForm = () => {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleLoginSubmit = (event) => {
        // TODO handle login submit
        event.preventDefault();
        alert("Login Submit");
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
                        type="email"
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
