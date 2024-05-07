import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    isValidPassword,
    isValidEmail
} from "../../../utils/authFunctionsAndHooks/validators/validatorIndex.js";
import axios from "axios";
import { USER_SERVICE_URL } from "../../../utils/constant.js";
import { useNavigate } from "react-router-dom";

const useResetPass = () => {
    const [inputs, setInputs] = useState({});
    const [isOTPRequested, setisOTPRequested] = useState(false);
    const [disabledOtpResend, setDisabledOtpResend] = useState(false);
    const [disabledOtpResendTimeRemaining, setDisabledOtpResendTimeRemaining] =
        useState(0);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const submitResetPassFormDetails = async (event) => {
        // TODO Reset Pass submit
        // setOtpSent(true);
        event.preventDefault();
        if (!inputs.otp) {
            return toast.error("Please enter OTP");
        }
        if (inputs.otp < 1000 || inputs.otp > 9999) {
            return toast.error("Wrong OTP");
        }
        try {
            const res = await axios.patch(USER_SERVICE_URL + "/reset-password/submit-otp", {
                email: inputs.email,
                password: inputs.password,
                otp: inputs.otp
            });
            toast.success(res?.data?.message || "Password updated successfully")
        } catch (error) {
            console.log(error);
            return toast.error(error?.response?.data?.message || "Something went wrong");
        }
        // TODO 
        // navigate("/login");
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

    const requestOTP = async (event) => {
        event.preventDefault();
        // TODO Reset Pass submit
        if (disabledOtpResend) {
            return toast.error(
                `Can't resend now, Please wait ${disabledOtpResendTimeRemaining} more seconds`
            );
        }
        if (!isValidEmail(inputs.email)) {
            return toast.error("Email is not valid");
        }
        if (inputs.password !== inputs.confirmPassword) {
            return toast.error("Passwords don't match");
        }
        const passwordErr = isValidPassword(inputs.password);
        if (passwordErr) {
            return toast.error(passwordErr);
        }
        // TODO Handle Submit OTP function
        try {
            const res = await axios.patch(USER_SERVICE_URL + "/reset-password/request-otp", {
                email: inputs.email,
                password: inputs.password
            });
            toast.success(res?.data?.message || "OTP requested successfully")
        } catch (error) {
            console.log(error);
            return toast.error(error?.response?.data?.message || "Requesting OTP failed!");
        }

        setDisabledOtpResendTimeRemaining(60);
        setDisabledOtpResend(true);
        setisOTPRequested(true);
    };

    return {
        handleChange,
        inputs,
        submitResetPassFormDetails,
        requestOTP,
        isOTPRequested,
        setisOTPRequested,
        disabledOtpResendTimeRemaining,
        disabledOtpResend
    };
};

export default useResetPass;
