import { configureStore } from "@reduxjs/toolkit"
import BusReducer from "./Bus-slice.js";
import MapReducer from "./Map-slice.js"
import SubwayReducer from "./Subway-slice.js"


const store = configureStore({
    reducer: { bus: BusReducer, map: MapReducer, subway: SubwayReducer }
});

export default store