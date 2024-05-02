import { useEffect, useState } from "react";
import "../../styles/loginPageStyles/loginAndRegistrationForm.css";

const ResetPass = () => {
    const [inputs, setInputs] = useState({});
    const [otpSent, setOtpSent] = useState(false);
    const [disabledOtpResend, setDisabledOtpResend] = useState(false);
    const [disabledOtpResendTimeRemaining, setDisabledOtpResendTimeRemaining] =
        useState(0);

    useEffect(() => {
        let timer;
        if (disabledOtpResend) {
            timer = setInterval(() => {
                setDisabledOtpResendTimeRemaining((prevSeconds) => {
                    if (prevSeconds === 1) {
                        clearInterval(timer);
                        setDisabledOtpResend(false);
                        return 0;
                    } else {
                        return prevSeconds - 1;
                    }
                });
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        };
    }, [disabledOtpResend]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleResetPassSubmit = (event) => {
        // TODO Reset Pass submit
        // setOtpSent(true);
        event.preventDefault();
        alert("Reset Submit");
    };

    const sendOTP = (event) => {
        event.preventDefault();
        // TODO Reset Pass submit
        if (disabledOtpResend) {
            alert(
                `Can't resend now, Please wait ${disabledOtpResendTimeRemaining} seconds`
            );
            return;
        }
        setDisabledOtpResendTimeRemaining(60);
        setDisabledOtpResend(true);
        setOtpSent(true);
        alert("Reset Submit");
    };

    return (
        <>
            <h1> Reset Password</h1>
            <form onSubmit={handleResetPassSubmit} className="form-container">
                {!otpSent ? (
                    <>
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
                                    lock
                                </span>
                            </div>
                            <input
                                placeholder="New Password"
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
                                placeholder="Confirm New Password"
                                className="input-field"
                                type="password"
                                name="confirmPassword"
                                value={inputs.confirmPassword || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            className="submit-btn"
                            onClick={sendOTP}
                            type="button"
                        >
                            Request OTP
                        </button>
                    </>
                ) : (
                    <>
                        <div className="change-email-container">
                            <span className="change-email-text">
                                OTP sent successfully to <u> {inputs.email}</u>
                            </span>
                            <button
                                className="change-email-button"
                                type="button"
                                onClick={() => {
                                    setOtpSent(false);
                                }}
                            >
                                <span className="material-symbols-rounded">
                                    edit
                                </span>
                            </button>
                        </div>
                        <div className="input-container four-dig-otp-field">
                            <div className="label-icon-container">
                                <span className="material-symbols-rounded label-icon">
                                    key
                                </span>
                            </div>
                            <input
                                placeholder="4 Digit OTP"
                                className="input-field"
                                type="number"
                                name="otp"
                                value={inputs.otp || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="resend-otp-button-container">
                            <button
                                disabled={disabledOtpResend}
                                className="resend-otp-btn"
                                type="button"
                                onClick={sendOTP}
                            >
                                Resend OTP&nbsp;
                                {disabledOtpResend ? (
                                    `(${disabledOtpResendTimeRemaining} seconds)`
                                ) : (
                                    <></>
                                )}
                            </button>
                        </div>
                        <button className="submit-btn" type="submit">
                            Reset Password
                        </button>
                    </>
                )}
            </form>
        </>
    );
};

export default ResetPass;
