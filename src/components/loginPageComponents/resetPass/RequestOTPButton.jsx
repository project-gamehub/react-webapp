import React from "react";

const RequestOTPButton = ({ requestOTP }) => {
    return (
        <button className="submit-btn" onClick={requestOTP} type="button">
            Request OTP
        </button>
    );
};

export default RequestOTPButton;
