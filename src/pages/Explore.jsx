import { Outlet } from "react-router-dom";
import ExplorePageNavbar from "../components/explorePageComponents/ExplorePageNavbar";
import "../styles/explorePageStyles/explorePage.css";
import { useEffect } from "react";

const Explore = () => {
    useEffect(() => {
        document.title = "Explore - GameHub";
    }, []);

    return (
        <div className="explore-page">
            <ExplorePageNavbar />
            <Outlet />
        </div>
    );
};

export default Explore;
