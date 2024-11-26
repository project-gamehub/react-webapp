import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchValue: "",
    searchUserList: []
};

const exploreSlice = createSlice({
    name: "exploreData",
    initialState,
    reducers: {
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
        setSearchUserList: (state, action) => {
            state.searchUserList = action.payload;
        }
    }
});

export const { setSearchValue, setSearchUserList } = exploreSlice.actions;

export default exploreSlice.reducer;
