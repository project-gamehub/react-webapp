import Shimmer from "./Shimmer";
import useUsername from "../utils/useUsername";

const DisplayUsername = ({ userId }) => {
    const username = useUsername(userId);
    if (!username) {
        return <Shimmer />;
    }
    return <>{username}</>;
};

export default DisplayUsername;
