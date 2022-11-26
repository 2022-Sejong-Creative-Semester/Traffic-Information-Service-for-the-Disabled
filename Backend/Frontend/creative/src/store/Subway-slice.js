import { createSlice } from "@reduxjs/toolkit";

const SubwaySlice = createSlice({
    name: "Subway",
    initialState: {
        subway: [],
        subwayCheck: false,
        subwayCheck2: true
    },
    reducers: {
        addSubwayInfo(state, action) {
            state.subway = action.payload
            state.subwayCheck = true
        },
        clickSubway(state, action) {
            state.subwayCheck2 = false;
        }
    }
})

export const SubwayActions = SubwaySlice.actions;
export default SubwaySlice.reducer;