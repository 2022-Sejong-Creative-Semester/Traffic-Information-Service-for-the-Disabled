import { createSlice } from "@reduxjs/toolkit";


const BusSlice = createSlice({
    name: "bus",
    initialState: {
        buslist: [],
        station: [],
        stationLocation: {},
        stationCheck: false,
        busCheck: false
    },
    reducers: {
        addStationInfo(state, action) {
            state.station = action.payload
            state.stationLocation = {}
            state.stationCheck = true
            state.busCheck = false
        },
        changeStation(state, action) {
            state.stationLocation = action.payload
        },
        addBusInfo(state, action) {
            state.buslist = action.payload
            state.stationCheck = false
            state.busCheck = true
        }
    }
});

export const BusActions = BusSlice.actions;
export default BusSlice.reducer;

