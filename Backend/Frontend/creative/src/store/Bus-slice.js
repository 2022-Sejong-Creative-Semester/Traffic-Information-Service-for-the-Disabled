import { createSlice } from "@reduxjs/toolkit";


const BusSlice = createSlice({
    name: "bus",
    initialState: { buslist: {} },
    reducers: {
        addBuslist(state) {

        }
    }
});

export const BusActions = BusSlice.actions;
export default BusSlice.reducer;

