import { configureStore } from "@reduxjs/toolkit";
import gameData from "./gameDataSlice";
import userData from "./userDataSlice";

export const store = configureStore({
    reducer: {
        gameDataSlice: gameData,
        userDataSlice: userData
    }
});
