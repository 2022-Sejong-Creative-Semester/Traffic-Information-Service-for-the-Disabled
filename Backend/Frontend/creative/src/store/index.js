import { configureStore } from "@reduxjs/toolkit"
import BusReducer from "./Bus-slice";
import MapReducer from "./Map-slice"
import SubwayReducer from "./Subway-slice"


const store = configureStore({
    reducer: { bus: BusReducer, map: MapReducer, subway: SubwayReducer }

});

export default store