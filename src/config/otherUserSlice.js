import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_SERVICE_URL } from "../utils/constant";

const initialState = {
    otherUsersData: { Hello: "hi" }
};

export const fetchUsernameFromId = createAsyncThunk(
    "fetchUsernameFromId",
    async (userId, { getState }) => {
        const otherUsersData = getState().otherUsersDataSlice.otherUsersData;

        if (otherUsersData[userId]?.username) {
            return {
                userId,
                data: { username: otherUsersData[userId].username }
            };
        }

        try {
            const response = await axios.get(
                `${USER_SERVICE_URL}/get-username-by-id/${userId}`
            );
            return {
                userId,
                data: { username: response?.data?.data?.username }
            };
        } catch (error) {
            console.log(error);
        }
    }
);

// export const fetchAvatarURLFromId = createAsyncThunk(
//     "fetchAvatarURLFromId",
//     async (userId, { getState }) => {
//         const state = getState().otherUsersData;

//         // Check if avatar URL is already available for this user
//         if (state.otherUsersData[userId]?.avatarURL) {
//             return { userId, data: { avatarURL: state.otherUsersData[userId].avatarURL } };
//         }

//         // TODO- Correct route
//         // const response = await axios.get(`${USER_SERVICE_URL}/get-avatar/${userId}`);
//         return { userId, data: { avatarURL: response.data.avatarURL } };
//     }
// );

const otherUsersDataSlice = createSlice({
    name: "otherUsersData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsernameFromId.fulfilled, (state, action) => {
            const { userId, data } = action.payload;
            state.otherUsersData[userId] = {
                ...state.otherUsersData[userId],
                ...data
            };
        });
        // .addCase(fetchAvatarURLFromId.fulfilled, (state, action) => {
        //     const { userId, data } = action.payload;
        //     state.otherUsersData[userId] = {
        //         ...state.otherUsersData[userId],
        //         ...data,
        //     };
        // });
    }
});

export default otherUsersDataSlice.reducer;
