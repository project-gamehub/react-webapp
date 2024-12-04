const EmailInput = ({ handleChange, email }) => {
    return (
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
                value={email}
                onChange={handleChange}
            />
        </div>
    );
};

export default EmailInput;
