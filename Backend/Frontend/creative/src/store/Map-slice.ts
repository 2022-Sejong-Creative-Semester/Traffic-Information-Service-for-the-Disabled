import { createSlice } from "@reduxjs/toolkit";

const MapSlice = createSlice({
    name: "Map",
    initialState: {
        position: {
            tmY: 0,
            tmX: 0
        },
        marker: [],
        busmode: false,
        subwaymode: false
    },
    reducers: {
        positioning(state, action) {
            state.position.tmX = action.payload.tmX;
            state.position.tmY = action.payload.tmY;
        },
        makerchacking(state, action) {
            state.marker = action.payload
        },
        initialization(state) {
            state.position = {
                tmY: 0,
                tmX: 0
            };
            state.marker = [];
            state.busmode = false;
            state.subwaymode = false;
        },
        Onbusmode(state) {
            state.busmode = true;
            state.subwaymode = false;
        },
        Onsubwaymode(state) {
            state.busmode = false;
            state.subwaymode = true;
        },
    }
})

export const MapActions = MapSlice.actions;
export default MapSlice.reducer;