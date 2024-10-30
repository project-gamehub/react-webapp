import { configureStore } from "@reduxjs/toolkit";
import gamesData from "./gamesDataSlice";
import userData from "./userDataSlice";
import leaderboardsData from "./leaderboardsDataSlice";
import chatsData from "./chatSlice";

export const store = configureStore({
    reducer: {
        gamesDataSlice: gamesData,
        userDataSlice: userData,
        leaderboardsDataSlice: leaderboardsData,
        chatsDataSlice: chatsData
    }
});
