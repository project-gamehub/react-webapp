import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../../config/chatSlice";
import "../../styles/chatPageStyles/chatList.css";
import "../../styles/chatPageStyles/chatSearchBar.css";
import ChatSearchBar from "./ChatSearchBar";
import ChatTile from "./ChatTile";

const ChatList = () => {
    const { chats, chatsDataLoading, chatsDataError } = useSelector(
        (state) => state.chatsDataSlice
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (!chats) {
            dispatch(fetchChats());
        }
    }, [dispatch, chats]);

    if (chatsDataError) {
        return (
            <div className="chat-list-container">
                <div>Error Fetching Chats Data</div>;
            </div>
        );
    }

    return (
        <div className="chat-list-wrapper">
            <ChatSearchBar />
            <div className="chat-list">
                {chatsDataLoading ? (
                    // TODO - Implement Shimmer here
                    <>Loading chats</>
                ) : (
                    <>
                        {chats.map((chat) => {
                            return (
                                <ChatTile
                                    chatData={chat}
                                    key={chat?.otherUserId}
                                />
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
};

export default ChatList;
