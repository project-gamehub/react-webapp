import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CHAT_SERVICE_URL } from "../utils/constant";

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
    async (
        // messageContent and userId as parameters
        { messageContent, otherUserId },
        { getState, dispatch }
    ) => {
        const accessToken = getState().userDataSlice.accessToken;
        if (!accessToken) {
            throw new Error("User not logged in");
        }

        const headers = {
            "access-token": accessToken
        };
        const timestamp = new Date().toISOString();
        // Push the message to the conversation[userId] array along with { "content": "", "timestamp": currentTime, "sending": "true"}
        dispatch(
            addMessageToConversation({
                otherUserId,
                message: { content: messageContent, timestamp, sending: "true" }
            })
        );
        // Send messge using "ChatServiceURL/send-message/:userId" with access token as sent in above functions and messageContent in body
        // If the message sent is successfull, change the "sending": "false"
        // Else change the "sending": "error"
        try {
            const response = await axios.post(
                `${CHAT_SERVICE_URL}/send-message/${otherUserId}`,
                { messageContent },
                { headers }
            );

            // Update message to "sending": "false" if successfully sent
            dispatch(
                updateMessageStatus({
                    otherUserId,
                    timestamp,
                    status: "false"
                })
            );
            return response.data;
        } catch (error) {
            // Update message to "sending": "error" if there was an error
            dispatch(
                updateMessageStatus({
                    otherUserId,
                    timestamp,
                    status: "error"
                })
            );
            throw new Error(error.response?.data?.message || error.message);
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
        }
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

export const { addMessageToConversation, updateMessageStatus } =
    chatSlice.actions;
export default chatSlice.reducer;
