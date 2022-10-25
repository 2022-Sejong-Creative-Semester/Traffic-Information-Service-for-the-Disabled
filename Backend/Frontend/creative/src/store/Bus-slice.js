import { createSlice } from "@reduxjs/toolkit";


const BusSlice = createSlice({
    name: "bus",
    initialState: {
        buslist: {},
        station: {},
        stationCheck: false
    },
    reducers: {
        addStationInfo(state, action) {
            state.station = action.payload
            state.stationCheck = true
        }
    }
});

export const BusActions = BusSlice.actions;
export default BusSlice.reducer;

