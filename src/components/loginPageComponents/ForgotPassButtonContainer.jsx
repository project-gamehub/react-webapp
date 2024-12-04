import { useNavigate } from "react-router-dom";

const ForgotPassButtonContainer = ({ showResetPassword }) => {
    const navigate = useNavigate();

    return (
        <div className="forgot-pass-btn-container">
            <button
                className="forgot-pass-btn"
                type="button"
                onClick={() => {
                    if (showResetPassword) {
                        navigate("/auth/login");
                    } else {
                        navigate("/auth/reset-pass");
                    }
                }}
            >
                {showResetPassword ? <>Back to login</> : <>Forgot Password?</>}
            </button>
        </div>
    );
};

export default ForgotPassButtonContainer;
