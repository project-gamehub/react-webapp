import { io } from "socket.io-client";
import { CHAT_SERVICE_URL } from "../utils/constant";

const socket = io(CHAT_SERVICE_URL);

export default socket;
