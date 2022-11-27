import { createSlice } from "@reduxjs/toolkit";


const BusSlice = createSlice({
    name: "bus",
    initialState: {
        buslist: [],
        station: [],
        busId: "",
        stationCheck: false,
        busCheck: false,
        currentStation: ""
    },
    reducers: {
        addStationInfo(state, action) {
            state.station = action.payload
            state.stationCheck = true
            state.busCheck = false
        },
        refreshBus(state, action) {
            state.busId = action.payload
        },
        addBusInfo(state, action) {
            state.buslist = action.payload
            state.stationCheck = false
            state.busCheck = true
        },
        ClickStation(state, action) {
            state.currentStation = action.payload
        }
    }
});

export const BusActions = BusSlice.actions;
export default BusSlice.reducer;

