import Footer from "../components/Footer";
import Navbar from "../components/navbarComponents/Navbar";
import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../config/userDataSlice";
import { useEffect } from "react";

const LayoutRoot = () => {
    const userData = useSelector((state) => state.userDataSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userData.userProfileDetails) {
            dispatch(fetchUserData());
        }
    }, [userData]);

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

export default LayoutRoot;
