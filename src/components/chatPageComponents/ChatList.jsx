import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../../config/chatSlice";
import "../../styles/chatPageStyles/chatList.css";
import ChatSearchBar from "./ChatSearchBar";
import ChatTile from "./ChatTile";

const ChatList = () => {
    const { chats, chatsDataLoading, chatsDataError } = useSelector(
        (state) => state.chatsDataSlice
    );
    const dispatch = useDispatch();

    const currentUserId = useSelector(
        (state) => state.userDataSlice?.userProfileDetails?._id
    );

    // TODO - Implement Pagination
    useEffect(() => {
        if (!chats) {
            dispatch(fetchChats());
        }
    }, [dispatch, chats]);

    if (chatsDataError) {
        return (
            <div className="chat-list-container">
                <div>Error Fetching Chats Data</div>
            </div>
        );
    }

    return (
        <div className="chat-list-wrapper">
            <ChatSearchBar />
            <div className="chat-list">
                {chatsDataLoading || !currentUserId ? (
                    // TODO - Implement Shimmer here
                    <>Loading chats</>
                ) : (
                    <>
                        {chats.map((chat) => {
                            let otherUserId;
                            if (
                                !chat.user1Id ||
                                chat.user1Id === currentUserId
                            ) {
                                otherUserId = chat.user2Id;
                            } else {
                                otherUserId = chat.user1Id;
                            }
                            const chatData = {
                                lastMessage: chat.lastMessage,
                                lastMessageTimestamp: chat.lastMessageTimestamp,
                                otherUserId
                            };

                            return (
                                <ChatTile
                                    chatData={chatData}
                                    key={otherUserId}
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
