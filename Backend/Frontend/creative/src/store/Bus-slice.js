import { createSlice } from "@reduxjs/toolkit";


const BusSlice = createSlice({
    name: "bus",
    initialState: {
        buslist: {},
        station: {}
    },
    reducers: {
        addStationInfo(state, action) {
            state.station = action.payload
        }
    }
});

export const BusActions = BusSlice.actions;
export default BusSlice.reducer;

