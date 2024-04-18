import { useState } from "react";
import "../styles/navbar.css";
import { LOGO_URL } from "../utils/constant";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const [isLogin] = useState(true);

    const userData = useSelector((state) => state.userDataSlice.value);

    return (
        <>
            <div className="header-container">
                <div>
                    <NavLink to="/">
                        <img src={LOGO_URL} alt="Logo" className="logo" />
                    </NavLink>
                </div>

                <div className="navbar-links-container">
                    <NavLink className="navbar-link" to="/">
                        <span class="material-symbols-rounded">home</span>
                        Home
                    </NavLink>
                    <NavLink className="navbar-link" to="/reels">
                        <span class="material-symbols-rounded">movie</span>
                        Reels
                    </NavLink>
                    <NavLink className="navbar-link" to="/explore">
                        <span class="material-symbols-rounded">public</span>
                        Near me
                    </NavLink>
                </div>

                <div className="profile-container">
                    {isLogin ? (
                        <NavLink className="navbar-link" to="/profile">
                            <span class="material-symbols-rounded">person</span>
                            {userData ? userData?.username : "username"}
                        </NavLink>
                    ) : (
                        <NavLink className="navbar-link" to="/login">
                            <span class="material-symbols-rounded explore-btn">
                                login
                            </span>
                            Login
                        </NavLink>
                    )}
                </div>
            </div>
        </>
    );
};

export default Header;
