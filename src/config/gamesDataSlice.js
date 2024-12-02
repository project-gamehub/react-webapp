import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GAMES_SERVICE_URL } from "../utils/constant";

const initialState = {
    gamesData: null,
    gamesDataLoading: true,
    gamesDataError: null,
    ratingData: {}
    // {
    //     gameId: {
    //         averageRating: xyz,
    //         totalRatings: xyz,
    //         userRating: xyz
    //     }
    // }
};

export const fetchGamesData = createAsyncThunk(
    "fetchGamesData",
    async (_, { getState }) => {
        const gamesData = getState()?.gamesDataSlice?.gamesData;
        if (gamesData) {
            return gamesData;
        } else {
            const response = await axios.get(GAMES_SERVICE_URL + "/games");
            return response?.data?.data;
        }
    }
);

export const fetchRatingData = createAsyncThunk(
    "fetchRatingData",
    async ({ gameId }, { getState, dispatch }) => {
        const accessToken = getState()?.userDataSlice?.accessToken;
        if (!accessToken) {
            throw new Error("User not logged in");
        }
        const response = await axios.get(
            `${GAMES_SERVICE_URL}/get-rating/${gameId}`,
            {
                headers: {
                    "access-token": accessToken
                }
            }
        );
        const ratingData = response?.data?.data;
        dispatch(updateRatingData({ gameId, ratingData }));
    }
);

export const gamesDataSlice = createSlice({
    name: "gamesData",
    initialState,
    reducers: {
        updateRatingData: (state, action) => {
            const { gameId, ratingData } = action.payload;
            state.ratingData[gameId] = ratingData;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGamesData.pending, (state) => {
                state.gamesDataLoading = true;
                state.gamesDataError = null;
            })
            .addCase(fetchGamesData.fulfilled, (state, action) => {
                state.gamesDataLoading = false;
                state.gamesData = action.payload;
                state.gamesDataError = null;
            })
            .addCase(fetchGamesData.rejected, (state, action) => {
                state.gamesDataLoading = false;
                state.gamesDataError = action.error.message;
            });
    }
});

export const { updateRatingData } = gamesDataSlice.actions;

export default gamesDataSlice.reducer;
