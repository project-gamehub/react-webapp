import IncomingFriendRequests from "../components/friendPageComponents/IncomingFriendRequests";
import FriendList from "../components/friendPageComponents/FriendList";
import "../styles/friendsPageStyles/friendPage.css";
import { useEffect, useState } from "react";

const Friends = () => {
    useEffect(() => {
        document.title = "Friends - GameHub";
    }, []);

    const [showFriendList, setShowFriendList] = useState(true);
    const [isSmallScreenState, setIsSmallScreenState] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const isSmallScreen =
                window.matchMedia("(max-width: 765px)").matches;
            if (isSmallScreen) {
                setIsSmallScreenState(true);
            } else {
                setIsSmallScreenState(false);
            }
        };
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!isSmallScreenState) {
        return (
            <div className="friend-page">
                <FriendList />
                <IncomingFriendRequests />
            </div>
        );
    }

    if (showFriendList) {
        return (
            <div className="friend-page">
                <FriendList setShowFriendList={setShowFriendList} />
            </div>
        );
    } else {
        return (
            <div className="friend-page">
                <IncomingFriendRequests setShowFriendList={setShowFriendList} />
            </div>
        );
    }
};

export default Friends;
