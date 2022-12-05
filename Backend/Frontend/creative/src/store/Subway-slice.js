import { createSlice } from "@reduxjs/toolkit";

const SubwaySlice = createSlice({
    name: "Subway",
    initialState: {
        subway: [],
        subwayCheck: false,
        subwayInfo: {},
        currentSubway: ""
    },
    reducers: {
        addSubwayInfo(state, action) {
            state.subway = action.payload
            state.subwayCheck = true
        },
        saveSubway(state, action) {
            state.subwayInfo = action.payload
        },
        initialState(state) {
            state.subway = [];
            state.subwayCheck = false;
            state.subwayInfo = {};
        },
        clickSubway(state, action) {
            state.currentSubway = action.payload;
        }
    }
})

export const SubwayActions = SubwaySlice.actions;
export default SubwaySlice.reducer;