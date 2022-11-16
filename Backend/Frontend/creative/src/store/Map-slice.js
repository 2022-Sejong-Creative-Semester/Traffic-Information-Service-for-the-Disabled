import { createSlice } from "@reduxjs/toolkit";

const MapSlice = createSlice({
    name: "Map",
    initialState: {
        position: {
            tmY: 37.55068403524657,
            tmX: 127.07411251036736
        }
    },
    reducers: {
        positioning(state, action) {
            state.position.tmX = action.payload.tmX;
            state.position.tmY = action.payload.tmY;
        }
    }
})

export const MapActions = MapSlice.actions;
export default MapSlice.reducer;