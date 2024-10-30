import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CHAT_SERVICE_URL } from "../utils/constant";

const initialState = {
    chats: null,
    conversation: {},
    chatsDataLoading: true,
    chatsDataError: null
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
    async ({ otherUserId }, { getState }) => {
        const response = await axios.get(
            CHAT_SERVICE_URL + "/get-conversation/" + otherUserId
        );
        // {}
        return {};
        // return response.data;
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
            });
        // .addCase(fetchConversation.fulfilled, (state, action) => {
        //     state.conversation = action.payload;
        //     state.status = 'succeeded';
        // })
        // .addCase(sendMessage.fulfilled, (state, action) => {
        //     state.conversation.push(action.meta.arg); // Append sent message to conversation
        // })
        // .addMatcher(
        //     (action) => action.type.endsWith('/pending'),
        //     (state) => {
        //         state.status = 'loading';
        //         state.chatsDataLoading = true;
        //     }
        // )
        // .addMatcher(
        //     (action) => action.type.endsWith('/rejected'),
        //     (state, action) => {
        //         state.status = 'failed';
        //         state.error = action.error.message;
        //         state.chatsDataLoading = false;
        //     }
        // );
    }
});

export default chatSlice.reducer;
