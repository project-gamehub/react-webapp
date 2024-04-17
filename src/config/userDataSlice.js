import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: null };

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
