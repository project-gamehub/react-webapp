const ResendOTPButton = ({
    disabledOtpResend,
    resendOTP,
    disabledOtpResendTimeRemaining
}) => {
    return (
        <div className="resend-otp-button-container">
            <button
                disabled={disabledOtpResend}
                className="resend-otp-btn"
                type="button"
                onClick={resendOTP}
            >
                Resend OTP&nbsp;
                {disabledOtpResend ? (
                    `(${disabledOtpResendTimeRemaining} seconds)`
                ) : (
                    <></>
                )}
            </button>
        </div>
    );
};

export default ResendOTPButton;
