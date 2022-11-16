import { configureStore } from "@reduxjs/toolkit"
import BusReducer from "./Bus-slice";
import MapReducer from "./Map-slice"


const store = configureStore({
    reducer: { bus: BusReducer, map: MapReducer }
});

export default store