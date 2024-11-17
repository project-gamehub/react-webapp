import { useCallback } from "react";
import socket from "../../../../utils/getTicTacToeSocket";
import { toast } from "react-toastify";

const useJoinGame = () => {
    const joinGame = useCallback((accessToken, gameId) => {
        if (!gameId) {
            toast.error("Please enter a Game ID to join");
            return;
        }

        socket.emit("joinGame", { accessToken, gameId }, (response) => {
            if (!response?.success) {
                toast.error(response.message);
                return;
            }
        });
    }, []);

    return joinGame;
};

export default useJoinGame;
