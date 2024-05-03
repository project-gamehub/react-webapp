import Footer from "../components/Footer";
import Navbar from "../components/navbarComponents/Navbar";
import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../config/userDataSlice";
import { useEffect } from "react";

const LayoutRoot = () => {
    const { accessToken } = useSelector((state) => state.userDataSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("fetching");
        dispatch(fetchUserData());
    }, [accessToken]);

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

export default LayoutRoot;
