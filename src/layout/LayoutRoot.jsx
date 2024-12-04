import Navbar from "../components/navbarComponents/Navbar";
import { Outlet, useSearchParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, updateUserAccessToken } from "../config/userDataSlice";
import { Suspense, useEffect } from "react";
import getCookie from "../utils/authFunctionsAndHooks/handleCookies/getCookie";
import handleAccessToken from "../utils/handleAccessToken";
import deleteCookie from "../utils/authFunctionsAndHooks/handleCookies/deleteCookie";
import { toast } from "react-toastify";
import Shimmer from "../components/Shimmer";

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

    useEffect(() => {
        if (!isLogin) {
            const token = getCookie("access-token");
            if (token) {
                handleAccessToken(token);
                dispatch(updateUserAccessToken(token));
                deleteCookie("access-token");
                toast.success("Logged in successfully");
            } else {
                const isLoginFailed = params.get("login-failed");
                if (isLoginFailed === "true") {
                    toast.error("Login Failed");
                }
            }
        }
    }, [dispatch, isLogin, params]);

    const hideNavbar =
        location.pathname.startsWith("/play/") ||
        location.pathname.startsWith("/auth/");

    return (
        <>
            {!hideNavbar && <Navbar />}
            <Suspense
                fallback={
                    <div className="suspense-fallback-container">
                        <Shimmer />
                    </div>
                }
            >
                <Outlet />
            </Suspense>
        </>
    );
};

export default LayoutRoot;
