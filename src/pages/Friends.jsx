import IncomingFriendRequests from "../components/friendPageComponents/IncomingFriendRequests";
import FriendList from "../components/friendPageComponents/FriendList";
import "../styles/friendsPageStyles/friendPage.css";

const Friends = () => {
    return (
        <div className="friend-page">
            <FriendList />
            <IncomingFriendRequests />
        </div>
    );
};

export default Friends;
