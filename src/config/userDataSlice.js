import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_SERVICE_URL } from "../utils/constant";

const token = localStorage.getItem("access-token");

const initialState = {
    isLogin: token ? true : false,
    accessToken: token,
    userProfileDetails: null,
    userDataLoading: true,
    userDataError: null
};

export const fetchUserData = createAsyncThunk(
    "fetchUserData",
    async (_, { getState }) => {
        const userData = getState().userDataSlice;
        const headers = {
            "access-token": userData.accessToken
        };
        const response = await axios.get(USER_SERVICE_URL + "/get-my-details", {
            headers
        });
        const data = response?.data?.data;
        return data;
    }
);

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        updateUserAccessToken: (state, action) => {
            state.accessToken = action.payload;
            state.isLogin = true;
            console.log("Updating access token");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.userDataLoading = true;
                state.userDataError = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.userDataLoading = false;
                state.userProfileDetails = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.userDataLoading = false;
                state.userDataError = action.error.message;
            });
    }
});

export const { updateUserAccessToken } = userDataSlice.actions;

export default userDataSlice.reducer;
