// src/components/ChatList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchChats } from '../features/chat/chatSlice';
import { fetchChats } from "../../config/chatSlice";
import { Link } from "react-router-dom";

const ChatList = () => {
    const dispatch = useDispatch();
    // const { chats } = useSelector((state) => state.chats);

    // console.log(chats);

    useEffect(() => {
        // if (status === "idle") {
        dispatch(fetchChats());
        // }
    }, [dispatch]);

    return (
        <div>
            <h2>Chat List</h2>
            <Link to={"65ff7f353105082f8d3b4449"}>Go </Link>
        </div>
    );
};

export default ChatList;
