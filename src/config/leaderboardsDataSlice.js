import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GAMES_SERVICE_URL } from "../utils/constant";

const initialState = {
    leaderboardsData: {},
    leaderboardsDataLoading: true,
    leaderboardsDataError: null,
    currentUserLbStat: {}
};

export const fetchcurrentUserLbStat = createAsyncThunk(
    "fetchcurrentUserLbStat",
    async (gameId, getState) => {
        const currentUserLbStat =
            getState.getState()?.leaderboardsDataSlice?.currentUserLbStat;
        if (currentUserLbStat && currentUserLbStat[gameId]) {
            return false;
        }
        const userId =
            getState.getState().userDataSlice?.userProfileDetails?._id;

        if (!userId) {
            return false;
        }
        const response = await axios.get(
            GAMES_SERVICE_URL + "/get-my-score/" + gameId + "?userId=" + userId
        );
        return { gameId, data: response?.data?.data };
    }
);

export const fetchLeaderboardData = createAsyncThunk(
    "fetchLeaderboardData",
    async (gameId, getState) => {
        const leaderboardsData =
            getState.getState()?.leaderboardsDataSlice?.leaderboardsData;
        if (leaderboardsData && leaderboardsData[gameId]) {
            return false;
        }
        const response = await axios.get(
            GAMES_SERVICE_URL + "/leaderboard/" + gameId
        );
        return { gameId, data: response?.data?.data };
    }
);

export const leaderboardsDataSlice = createSlice({
    name: "leaderboardsData",
    initialState,
    reducers: {
        clearCurrentUserLbStat: (state) => {
            state.currentUserLbStat = {}; // Clear only the currentUserLbStat property
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeaderboardData.pending, (state) => {
                state.leaderboardsDataLoading = true;
                state.leaderboardsDataError = null;
            })
            .addCase(fetchLeaderboardData.fulfilled, (state, action) => {
                state.leaderboardsDataError = null;
                state.leaderboardsDataLoading = false;
                if (action.payload !== false) {
                    const { gameId, data } = action.payload;
                    state.leaderboardsData = {
                        ...state.leaderboardsData,
                        [gameId]: data
                    };
                }
            })
            .addCase(fetchLeaderboardData.rejected, (state, action) => {
                state.leaderboardsDataLoading = false;
                state.leaderboardsDataError = action.error.message;
            })
            .addCase(fetchcurrentUserLbStat.fulfilled, (state, action) => {
                if (action.payload !== false) {
                    const { gameId, data } = action.payload;
                    state.currentUserLbStat = {
                        ...state.currentUserLbStat,
                        [gameId]: data
                    };
                }
            });
    }
});

export const { clearCurrentUserLbStat } = leaderboardsDataSlice.actions;

export default leaderboardsDataSlice.reducer;
