import {
    isValidPassword,
    isValidEmail,
    isInvalidUsername
} from "../validators/validatorIndex.js";
import { toast } from "react-toastify";
import axios from "axios";
import { USER_SERVICE_URL } from "../../constant.js";
import handleAccessToken from "../../handleAccessToken.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserAccessToken } from "../../../config/userDataSlice.js";

const useRegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegisterFormSubmit = async (event, inputs) => {
        try {
            event.preventDefault();
            if (!isValidEmail(inputs.email)) {
                return toast.error("Email is not valid");
            }

            const usernameError = isInvalidUsername(inputs.username);
            if (usernameError) {
                return toast.error(usernameError);
            }

            if (inputs.password !== inputs.confirmPassword) {
                return toast.error("Passwords don't match");
            }

            const passwordErr = isValidPassword(inputs.password);
            if (passwordErr) {
                return toast.error(passwordErr);
            }

            const res = await toast.promise(
                axios.post(USER_SERVICE_URL + "/signup", {
                    email: inputs.email,
                    password: inputs.password,
                    username: inputs.username
                }),
                {
                    pending: "Registering..."
                }
            );

            if (!res?.data?.data["access-token"]) {
                throw new Error("Something went wrong at server side");
            }

            handleAccessToken(res.data.data["access-token"]);
            dispatch(updateUserAccessToken(res.data.data["access-token"]));

            toast.success("Registered successfully");
            navigate("/");
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    error?.message ||
                    "Something went wrong"
            );
        }
    };

    return handleRegisterFormSubmit;
};

export default useRegisterForm;
