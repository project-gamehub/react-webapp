import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../../config/chatSlice";
import "../../styles/chatPageStyles/chatList.css";
import ChatSearchBar from "./ChatSearchBar";
import ChatTile from "./ChatTile";
import { useParams } from "react-router-dom";

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

    const { otherUserId } = useParams();
    const [showChatList, setShowChatList] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            const isSmallScreen =
                window.matchMedia("(max-width: 765px)").matches;
            if (isSmallScreen) {
                if (!otherUserId) {
                    setShowChatList(true);
                } else {
                    setShowChatList(false);
                }
            } else {
                setShowChatList(true);
            }
        };
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [otherUserId]);

    if (!showChatList) {
        return <></>;
    }

    if (chatsDataError) {
        return (
            <div className="chat-list-container">
                <div>Error Fetching Chats Data</div>
            </div>
        );
    }

    const sortedChats = chats
        ? [...chats].sort(
              (a, b) =>
                  new Date(b.lastMessageTimestamp) -
                  new Date(a.lastMessageTimestamp)
          )
        : [];

    return (
        <div className="chat-list-wrapper">
            <ChatSearchBar />
            <div className="chat-list">
                {chatsDataLoading || !currentUserId ? (
                    // TODO - Implement Shimmer here
                    <>Loading chats</>
                ) : (
                    <>
                        {sortedChats.map((chat) => {
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
