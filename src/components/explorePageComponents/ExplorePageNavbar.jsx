import { NavLink } from "react-router-dom";

const ExplorePageNavbar = () => {
    return (
        <div className="explore-page-navbar">
            <NavLink to={"search-user"} className={"explore-page-navbar-link"}>
                Search User
            </NavLink>
            <NavLink to={"near-me"} className={"explore-page-navbar-link"}>
                Near Me
            </NavLink>
        </div>
    );
};

export default ExplorePageNavbar;
