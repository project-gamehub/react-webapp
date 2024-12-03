import IncomingFriendRequests from "../components/friendPageComponents/IncomingFriendRequests";
import FriendList from "../components/friendPageComponents/FriendList";
import "../styles/friendsPageStyles/friendPage.css";
import { useEffect } from "react";

const Friends = () => {
    useEffect(() => {
        document.title = "Friends - GameHub";
    }, []);

    return (
        <div className="friend-page">
            <FriendList />
            <IncomingFriendRequests />
        </div>
    );
};

export default Friends;
