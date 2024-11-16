import { io } from "socket.io-client";
import { TICTACTOE_SERVICE_URL } from "./constant";

const socket = io(TICTACTOE_SERVICE_URL);

export default socket;
