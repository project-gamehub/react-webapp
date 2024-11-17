import { useSelector } from "react-redux";
import useUsername from "../../../utils/useUsername";

const PlayerUsernames = ({ opponentId }) => {
    const selfUsername = useSelector(
        (state) => state.userDataSlice?.userProfileDetails?.username
    );

    const opponentUsername = useUsername(opponentId);

    return (
        <div>
            {selfUsername} vs {opponentUsername}
        </div>
    );
};

export default PlayerUsernames;
