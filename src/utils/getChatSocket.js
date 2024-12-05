import { io } from "socket.io-client";
import { CHAT_SERVICE_SOCKET_URL } from "./constant";

const socket = io(CHAT_SERVICE_SOCKET_URL);

export default socket;
