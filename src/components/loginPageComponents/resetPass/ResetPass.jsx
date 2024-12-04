import { useEffect } from "react";
import "../../../styles/loginPageStyles/loginAndRegistrationForm.css";
import useResetPass from "./useResetPass.js";
import ChangeEmailText from "./ChangeEmailText.jsx";
import OTPInputFieldContainer from "./OTPInputFieldContainer.jsx";
import EmailInput from "./EmailInput.jsx";
import ResetPassInput from "./ResetPassInput.jsx";
import ConfirmResetPassInput from "./ConfirmResetPassInput.jsx";
import RequestOTPButton from "./RequestOTPButton.jsx";
import ResendOTPButton from "./ResendOTPButton.jsx";
import ResetPassSubmitButton from "./ResetPassSubmitButton.jsx";

const ResetPass = () => {
    const {
        handleChange,
        inputs,
        submitResetPassFormDetails,
        requestOTP,
        isOTPRequested,
        setIsOTPRequested,
        disabledOtpResendTimeRemaining,
        disabledOtpResend,
        resendOTP
    } = useResetPass();

    useEffect(() => {
        document.title = "Reset Pass - GameHub";
    }, []);

    return (
        <>
            <h1> Reset Password</h1>
            <form
                onSubmit={submitResetPassFormDetails}
                className="form-container"
                noValidate
            >
                {!isOTPRequested ? (
                    <>
                        <EmailInput
                            handleChange={handleChange}
                            email={inputs.email || ""}
                        />
                        <ResetPassInput
                            handleChange={handleChange}
                            password={inputs.password || ""}
                        />
                        <ConfirmResetPassInput
                            handleChange={handleChange}
                            confirmPassword={inputs.confirmPassword || ""}
                        />
                        <RequestOTPButton requestOTP={requestOTP} />
                    </>
                ) : (
                    <>
                        <ChangeEmailText
                            setIsOTPRequested={setIsOTPRequested}
                            email={inputs.email}
                        />
                        <OTPInputFieldContainer
                            handleChange={handleChange}
                            otp={inputs.otp || ""}
                        />
                        <ResendOTPButton
                            disabledOtpResend={disabledOtpResend}
                            resendOTP={resendOTP}
                            disabledOtpResendTimeRemaining={
                                disabledOtpResendTimeRemaining
                            }
                        />
                        <ResetPassSubmitButton />
                    </>
                )}
            </form>
        </>
    );
};

export default ResetPass;
