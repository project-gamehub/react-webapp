import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../config/userDataSlice";
import { useNavigate } from "react-router-dom";
import { resetState as resetFriendsDataState } from "../config/friendsDataSlice";
import { resetState as resetChatsDataState } from "../config/chatSlice";
import { clearCurrentUserLbStat } from "../config/leaderboardsDataSlice";
import useChatRoom from "../components/chatPageComponents/customHooks/useChatRoom";

const useLogout = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { cancelChatRoom } = useChatRoom();

    const handleLogout = async () => {
        try {
            navigate("/auth/login");
            localStorage.removeItem("access-token");
            dispatch(logout());
            cancelChatRoom();
            dispatch(resetFriendsDataState());
            dispatch(resetChatsDataState());
            dispatch(clearCurrentUserLbStat());
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error("Logged out failed");
        }
    };
    return handleLogout;
};

export default useLogout;
