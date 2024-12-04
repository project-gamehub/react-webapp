import React from "react";

const ResetPassInput = ({ handleChange, password }) => {
    return (
        <div className="input-container">
            <div className="label-icon-container">
                <span className="material-symbols-rounded label-icon">
                    lock
                </span>
            </div>
            <input
                placeholder="New Password"
                className="input-field"
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
            />
        </div>
    );
};

export default ResetPassInput;
