import React, { useState } from "react";
import "../../styles/loginPageStyles/loginAndRegistrationForm.css";

const RegistrationForm = () => {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event) => {
        // TODO handle submit
        event.preventDefault();
        alert(inputs);
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
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
    );
};

export default RegistrationForm;
