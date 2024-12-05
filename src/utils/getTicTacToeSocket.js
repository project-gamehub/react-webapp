import { io } from "socket.io-client";
import { TICTACTOE_SOCKET_URL } from "./constant";

const socket = io(TICTACTOE_SOCKET_URL);

export default socket;
