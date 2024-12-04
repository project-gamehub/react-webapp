import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CHAT_SERVICE_URL } from "../utils/constant";
import socket from "../utils/getChatSocket";

const initialState = {
    chats: null,
    chatsDataLoading: true,
    chatsDataError: null,

    conversation: {},
    conversationDataLoading: true,
    conversationDataError: null
};

export const fetchChats = createAsyncThunk(
    "fetchChats",
    async (_, { getState }) => {
        const chatsData = getState()?.chatsDataSlice?.chats;
        if (chatsData) {
            return chatsData;
        }
        const accessToken = getState().userDataSlice.accessToken;
        if (!accessToken) {
            throw new Error("User not logged in");
        }
        const headers = {
            "access-token": accessToken
        };
        try {
            const response = await axios.get(CHAT_SERVICE_URL + "/get-chats", {
                headers
            });

            return response?.data?.chats;
        } catch (error) {
            throw new Error(error?.response?.data?.message || error.message);
        }
    }
);

export const fetchConversation = createAsyncThunk(
    "fetchConversation",
    async (otherUserId, { getState }) => {
        const conversationData = getState()?.chatsDataSlice?.conversation;
        if (conversationData?.otherUserId) {
            return conversationData;
        }

        const accessToken = getState().userDataSlice.accessToken;
        if (!accessToken) {
            throw new Error("User not logged in");
        }
        const headers = {
            "access-token": accessToken
        };

        try {
            const response = await axios.get(
                CHAT_SERVICE_URL + "/get-conversation/" + otherUserId,
                {
                    headers
                }
            );
            return response?.data?.messages;
        } catch (error) {
            throw new Error(error?.response?.data?.message || error.message);
        }
    }
);

export const sendMessage = createAsyncThunk(
    "sendMessage",
    async ({ messageContent, otherUserId }, { getState, dispatch }) => {
        const accessToken = getState().userDataSlice.accessToken;
        if (!accessToken) {
            throw new Error("User not logged in");
        }

        const timestamp = new Date().toISOString();

        dispatch(
            addMessageToConversation({
                otherUserId,
                message: { content: messageContent, timestamp, sending: "true" }
            })
        );

        try {
            const emitMessage = new Promise((resolve, reject) => {
                socket.emit(
                    "send-message",
                    { messageContent, otherUserId, accessToken },
                    (response) => {
                        if (response && response.error) {
                            reject(
                                new Error(
                                    response.message || "Failed to send message"
                                )
                            );
                        } else {
                            resolve();
                        }
                    }
                );
            });

            await emitMessage;

            dispatch(
                updateMessageStatus({
                    otherUserId,
                    timestamp,
                    status: "false"
                })
            );
            dispatch(
                updateChatSummary({
                    otherUserId,
                    lastMessage: messageContent,
                    lastMessageTimestamp: timestamp
                })
            );
        } catch (error) {
            // TODO - If error is encountered, understand the error and if possible, retry sending the message instead of updating status to error
            dispatch(
                updateMessageStatus({
                    otherUserId,
                    timestamp,
                    status: "error"
                })
            );
        }
    }
);

const chatSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        addMessageToConversation: (state, action) => {
            const { otherUserId, message } = action.payload;
            if (!state.conversation[otherUserId]) {
                state.conversation[otherUserId] = [];
            }
            state.conversation[otherUserId].push(message);
        },
        updateMessageStatus: (state, action) => {
            const { otherUserId, timestamp, status } = action.payload;
            const messageList = state.conversation[otherUserId];
            if (messageList) {
                const message = messageList.find(
                    (msg) => msg.timestamp === timestamp
                );
                if (message) {
                    message.sending = status;
                }
            }
        },
        receiveMessage: (state, action) => {
            const { senderId, messageContent, timestamp } = action.payload;
            if (!state.conversation[senderId]) {
                state.conversation[senderId] = [];
            }
            state.conversation[senderId].push({
                senderId,
                content: messageContent,
                timestamp,
                sending: "false"
            });

            const chatIndex = state.chats.findIndex(
                (chat) => chat.user1Id === senderId || chat.user2Id === senderId
            );

            if (chatIndex !== -1) {
                state.chats[chatIndex].lastMessage = messageContent;
                state.chats[chatIndex].lastMessageTimestamp = timestamp;
            } else {
                state.chats.push({
                    user2Id: senderId,
                    lastMessage: messageContent,
                    lastMessageTimestamp: timestamp
                });
            }
        },
        updateChatSummary: (state, action) => {
            const { otherUserId, lastMessage, lastMessageTimestamp } =
                action.payload;
            const chat = state.chats?.find(
                (chat) =>
                    chat.user1Id === otherUserId || chat.user2Id === otherUserId
            );

            if (chat) {
                chat.lastMessage = lastMessage;
                chat.lastMessageTimestamp = lastMessageTimestamp;
            } else {
                state.chats.push({
                    user2Id: otherUserId,
                    lastMessage,
                    lastMessageTimestamp
                });
            }
        },
        resetState: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChats.fulfilled, (state, action) => {
                state.chats = action.payload;
                state.chatsDataLoading = false;
                state.chatsDataError = null;
            })
            .addCase(fetchChats.rejected, (state, action) => {
                state.chatsDataLoading = false;
                state.chatsDataError =
                    action.error?.response?.data?.message ||
                    action.error.message;
            })
            .addCase(fetchChats.pending, (state) => {
                state.chatsDataLoading = true;
                state.chatsDataError = null;
            })
            .addCase(fetchConversation.fulfilled, (state, action) => {
                const otherUserId = action.meta.arg;
                state.conversation[otherUserId] = action.payload;
                state.conversationDataLoading = false;
                state.conversationDataError = null;
            })
            .addCase(fetchConversation.rejected, (state, action) => {
                state.conversationDataLoading = false;
                state.conversationDataError =
                    action.error?.response?.data?.message ||
                    action.error.message;
            })
            .addCase(fetchConversation.pending, (state) => {
                state.conversationDataLoading = true;
                state.conversationDataError = null;
            });
    }
});

export const {
    addMessageToConversation,
    updateMessageStatus,
    receiveMessage,
    updateChatSummary,
    resetState
} = chatSlice.actions;
export default chatSlice.reducer;
