import React from "react";

const OTPInputFieldContainer = ({ handleChange, otp }) => {
    return (
        <div className="input-container four-dig-otp-field">
            <div className="label-icon-container">
                <span className="material-symbols-rounded label-icon">key</span>
            </div>
            <input
                placeholder="4 Digit OTP"
                className="input-field"
                type="number"
                name="otp"
                value={otp}
                onChange={handleChange}
            />
        </div>
    );
};

export default OTPInputFieldContainer;
