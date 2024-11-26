import { Outlet } from "react-router-dom";
import ExplorePageNavbar from "../components/explorePageComponents/ExplorePageNavbar";
import "../styles/explorePageStyles/explorePage.css";

const Explore = () => {
    return (
        <div className="explore-page">
            <ExplorePageNavbar />
            <Outlet />
        </div>
    );
};

export default Explore;
