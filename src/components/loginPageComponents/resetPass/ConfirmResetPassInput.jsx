const ConfirmResetPassInput = ({ handleChange, confirmPassword }) => {
    return (
        <div className="input-container">
            <div className="label-icon-container">
                <span className="material-symbols-rounded label-icon">
                    lock
                </span>
            </div>
            <input
                placeholder="Confirm New Password"
                className="input-field"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
            />
        </div>
    );
};

export default ConfirmResetPassInput;
