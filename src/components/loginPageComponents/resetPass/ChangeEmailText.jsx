const ChangeEmailText = ({ setIsOTPRequested, email }) => {
    return (
        <span className="change-email-text">
            OTP sent successfully to&nbsp;
            <span className="email-and-change-button-container">
                <u>{email}</u>
                &nbsp;
                <button
                    className="change-email-button"
                    type="button"
                    onClick={() => {
                        setIsOTPRequested(false);
                    }}
                >
                    <span className="material-symbols-rounded">edit</span>
                </button>
            </span>
        </span>
    );
};

export default ChangeEmailText;
