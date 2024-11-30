import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {}
    // {
    //     userId : {
    //         location: {
    //              "type": "Point",
    //              "coordinates": [
    //                  lng,
    //                  lat
    //                 ],
    //              "lastUpdatedTime": Date
    //          },
    //          _id: ID,
    //          username: USERNAME
    //          avatar: AVATAR
    //     },
    //     userId : {
    //         location: {
    //              "type": "Point",
    //              "coordinates": [
    //                  lng,
    //                  lat
    //                 ],
    //              "lastUpdatedTime": Date
    //          },
    //          _id: ID,
    //          username: USERNAME
    //          avatar: AVATAR
    //     }, ...
    // }
};

const mapDataSlice = createSlice({
    name: "mapDataSlice",
    initialState,
    reducers: {
        updateMapData: (state, action) => {
            action.payload.forEach((user) => {
                state.data[user._id] = user; // Use user ID as the key
            });
        }
    }
});

export const { updateMapData } = mapDataSlice.actions;
export default mapDataSlice.reducer;
