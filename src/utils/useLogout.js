import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../config/userDataSlice";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            localStorage.removeItem("access-token");
            dispatch(logout());
            toast.success("Logged out successfully");
            navigate("/auth/login");
        } catch (error) {
            toast.error("Logged out failed");
        }
    };
    return handleLogout;
};

export default useLogout;
