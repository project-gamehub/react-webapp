import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("access-token");

const initialState = {
    isLogin: token ? true : false,
    accessToken: token
};

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        addUserData(state, action) {
            state.value = action.payload;
        }
    }
});

export const { addUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
