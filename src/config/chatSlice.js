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

// export const sendMessage = createAsyncThunk(
//     "chat/sendMessage",
//     async ({ userId, otherUserId, messageContent }) => {
//         const response = await axios.post(`${CHAT_SERVICE_URL}/send-message/${otherUserId}`, { messageContent });
//         return response.data;
//     }
// );

const chatSlice = createSlice({
    name: "chats",
    initialState,
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
                // console.log(state.conversation[otherUserId]);

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

export default chatSlice.reducer;
