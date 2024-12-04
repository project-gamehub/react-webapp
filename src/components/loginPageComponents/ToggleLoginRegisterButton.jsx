import { useNavigate } from "react-router-dom";

const ToggleLoginRegisterButton = ({ wantsToRegister }) => {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            className="toggle-login-register-btn"
            onClick={() => {
                if (wantsToRegister) {
                    navigate("/auth/login");
                } else {
                    navigate("/auth/register");
                }
            }}
        >
            {wantsToRegister ? (
                <>
                    Already have an account?&nbsp;
                    <span>Click to Login</span>
                </>
            ) : (
                <>
                    Don't have an account?&nbsp;
                    <span>Click to Register</span>
                </>
            )}
        </button>
    );
};

export default ToggleLoginRegisterButton;
