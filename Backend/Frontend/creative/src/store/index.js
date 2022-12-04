import { configureStore } from "@reduxjs/toolkit"
import BusReducer from "./Bus-slice.js";
import MapReducer from "./Map-slice.js"
import SubwayReducer from "./Subway-slice.js"
import { combineReducers } from "@reduxjs/toolkit";



const reducer = combineReducers({
    bus: BusReducer, map: MapReducer, subway: SubwayReducer
})

const store = configureStore({
    reducer: reducer
});


export default store
