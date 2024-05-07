import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    isValidPassword,
    isValidEmail
} from "../../../utils/authFunctionsAndHooks/validators/validatorIndex.js";

const useResetPass = () => {
    const [inputs, setInputs] = useState({});
    const [isOTPRequested, setisOTPRequested] = useState(false);
    const [disabledOtpResend, setDisabledOtpResend] = useState(false);
    const [disabledOtpResendTimeRemaining, setDisabledOtpResendTimeRemaining] =
        useState(0);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const submiteResetPassFormDetails = (event) => {
        // TODO Reset Pass submit
        // setOtpSent(true);
        event.preventDefault();
        if (!inputs.otp) {
            toast.error("Please enter OTP");
            return;
        }
        if (inputs.otp < 1000 || inputs.otp > 9999) {
            toast.error("Wrong OTP");
            return;
        }
        alert("Reset Submit");
    };

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

    const requestOTP = (event) => {
        event.preventDefault();
        // TODO Reset Pass submit
        if (disabledOtpResend) {
            toast.error(
                `Can't resend now, Please wait ${disabledOtpResendTimeRemaining} more seconds`
            );
            return;
        }
        if (!isValidEmail(inputs.email)) {
            toast.error("Email is not valid");
            return;
        }
        if (inputs.password !== inputs.confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }
        const passwordErr = isValidPassword(inputs.password);
        if (passwordErr) {
            toast.error(passwordErr);
            return;
        }
        setDisabledOtpResendTimeRemaining(60);
        setDisabledOtpResend(true);
        setisOTPRequested(true);

        // TODO Handle Submit OTP function
    };

    return {
        handleChange,
        inputs,
        submiteResetPassFormDetails,
        requestOTP,
        isOTPRequested,
        setisOTPRequested,
        disabledOtpResendTimeRemaining,
        disabledOtpResend
    };
};

export default useResetPass;
