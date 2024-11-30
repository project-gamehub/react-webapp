import { configureStore } from "@reduxjs/toolkit";
import gamesData from "./gamesDataSlice";
import userData from "./userDataSlice";
import leaderboardsData from "./leaderboardsDataSlice";
import chatsData from "./chatSlice";
import otherUsersData from "./otherUserSlice";
import friendsData from "./friendsDataSlice";
import exploreSlice from "./exploreSlice";
import mapDataSlice from "./mapDataSlice";

export const store = configureStore({
    reducer: {
        gamesDataSlice: gamesData,
        userDataSlice: userData,
        leaderboardsDataSlice: leaderboardsData,
        chatsDataSlice: chatsData,
        otherUsersDataSlice: otherUsersData,
        friendsDataSlice: friendsData,
        exploreSlice: exploreSlice,
        mapDataSlice: mapDataSlice
    }
});
