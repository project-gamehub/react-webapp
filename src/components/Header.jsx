import React, { useState } from "react";
import "../styles/navbar.css";
import { LOGO_URL } from "../utils/constant";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const ASSETSURL = "./assets/";
    const [isLogin] = useState(true);

    const [onHoverReel, setOnHoverReel] = useState(false);
    const [onHoverHome, setOnHoverHome] = useState(false);
    const [onHoverMap, setOnHoverMap] = useState(false);

    const userData = useSelector((state) => state.userDataSlice.value);

    return (
        <>
            <div className="header-container">
                <div>
                    <NavLink to="/">
                        <img src={LOGO_URL} alt="Logo" className="logo" />
                    </NavLink>
                </div>

                <div className="navbar-ul">
                    <ul>
                        <li
                            className="icon-li"
                            onMouseEnter={() => setOnHoverHome(true)}
                            onMouseLeave={() => setOnHoverHome(false)}
                        >
                            <NavLink to="/">
                                <div className="inside-navlink">
                                    {onHoverHome ? (
                                        <div className="icon-container">
                                            <img
                                                className="home-gif-container"
                                                src={
                                                    ASSETSURL + "home-anim.gif"
                                                }
                                                alt="Hi"
                                            />
                                        </div>
                                    ) : (
                                        <div className="icon-container">
                                            <img
                                                className="icon-trans"
                                                src={
                                                    ASSETSURL +
                                                    "home-icon-trans.png"
                                                }
                                                alt="Hi"
                                            />
                                            <img
                                                className="icon home-icon"
                                                src={
                                                    ASSETSURL + "home-icon.png"
                                                }
                                                alt="Hi"
                                            />
                                        </div>
                                    )}
                                    <div className="li-label">Home</div>
                                </div>
                            </NavLink>
                        </li>
                        <li
                            className="icon-li"
                            onMouseEnter={() => setOnHoverReel(true)}
                            onMouseLeave={() => setOnHoverReel(false)}
                        >
                            <NavLink to="/reels">
                                <div className="inside-navlink">
                                    <div className="icon-container">
                                        {onHoverReel ? (
                                            <img
                                                className="reel-gif-container"
                                                src={
                                                    ASSETSURL + "reels-anim.gif"
                                                }
                                                alt="Hi"
                                            />
                                        ) : (
                                            <>
                                                <img
                                                    className="icon-trans"
                                                    src={
                                                        ASSETSURL +
                                                        "reels-icon-trans.png"
                                                    }
                                                    alt="Hi"
                                                />
                                                <img
                                                    className="icon"
                                                    src={
                                                        ASSETSURL +
                                                        "reels-icon.png"
                                                    }
                                                    alt="Hi"
                                                />
                                            </>
                                        )}
                                    </div>
                                    <div className="li-label">Reels</div>
                                </div>
                            </NavLink>
                        </li>
                        <li
                            className="icon-li"
                            onMouseEnter={() => setOnHoverMap(true)}
                            onMouseLeave={() => setOnHoverMap(false)}
                        >
                            <NavLink to="/explore">
                                <div className="inside-navlink">
                                    <div className="icon-container">
                                        {onHoverMap ? (
                                            <img
                                                className="mapico"
                                                src={ASSETSURL + "map-anim.gif"}
                                                alt="Hi"
                                            />
                                        ) : (
                                            <img
                                                className="mapico"
                                                src={ASSETSURL + "map-icon.png"}
                                                alt="Hi"
                                            />
                                        )}
                                    </div>
                                    <div className="li-label">Map</div>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="profile-container">
                    {isLogin ? (
                        <NavLink to="/profile">
                            <span class="material-symbols-rounded">person</span>
                            <div className="username-container">
                                {userData ? userData?.username : "..."}
                            </div>
                        </NavLink>
                    ) : (
                        <NavLink to="/login">
                            <span class="material-symbols-rounded explore-btn">
                                login
                            </span>
                            <div>Login/Sign Up</div>
                        </NavLink>
                    )}
                </div>
            </div>
        </>
    );
};

export default Header;
