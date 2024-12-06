import Navbar from "../components/navbarComponents/Navbar";
import {
    Outlet,
    useSearchParams,
    useLocation,
    useNavigate
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, updateUserAccessToken } from "../config/userDataSlice";
import { Suspense, useEffect } from "react";
import handleAccessToken from "../utils/handleAccessToken";
import { toast } from "react-toastify";
import Shimmer from "../components/Shimmer";
import ErrorBoundary from "../components/ErrorBoundary";

const LayoutRoot = () => {
    const { accessToken, isLogin } = useSelector(
        (state) => state.userDataSlice
    );
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(fetchUserData());
    }, [accessToken, dispatch]);

    const params = useSearchParams()[0];

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) {
            const token = params.get("access-token");
            if (token) {
                handleAccessToken(token);
                dispatch(updateUserAccessToken(token));
                navigate("/");
                toast.success("Logged in successfully");
            } else {
                const isLoginFailed = params.get("login-failed");
                if (isLoginFailed === "true") {
                    toast.error("Login Failed");
                }
            }
        }
    }, [dispatch, isLogin, params, navigate]);

    const hideNavbar =
        location.pathname.startsWith("/play/") ||
        location.pathname.startsWith("/auth/");

    return (
        <>
            {!hideNavbar && <Navbar />}
            <ErrorBoundary>
                <Suspense
                    fallback={
                        <div className="suspense-fallback-container">
                            <Shimmer />
                        </div>
                    }
                >
                    <Outlet />
                </Suspense>
            </ErrorBoundary>
        </>
    );
};

export default LayoutRoot;
