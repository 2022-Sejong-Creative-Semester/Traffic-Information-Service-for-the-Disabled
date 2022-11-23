import { createSlice } from "@reduxjs/toolkit";

const SubwaySlice = createSlice({
    name: "Subway",
    initialState: {

    },
    reducers: {
        subway(state, payload) {

        }
    }
})

export const SubwayActions = SubwaySlice.actions;
export default SubwaySlice.reducer;