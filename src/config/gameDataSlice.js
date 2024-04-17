import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GAMES_SERVICE_URL } from "../utils/constant";

const initialState = {
    data: null,
    loading: true,
    error: null
};

export const fetchGameData = createAsyncThunk(
    "fetchGameData",
    async (dispatch, getState) => {
        const gameData = getState.getState()?.gameDataSlice?.data;
        if (gameData) {
            return gameData;
        } else {
            const response = await axios.get(GAMES_SERVICE_URL + "games");
            return response?.data?.data;
        }
    }
);

export const gameDataSlice = createSlice({
    name: "gameData",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchGameData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGameData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchGameData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default gameDataSlice.reducer;
