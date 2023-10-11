import { configureStore } from "@reduxjs/toolkit"
import BusReducer from "./Bus-slice.ts";
import MapReducer from "./Map-slice.ts"
import SubwayReducer from "./Subway-slice.ts"
import { combineReducers } from "@reduxjs/toolkit";



const reducer = combineReducers({
    bus: BusReducer, map: MapReducer, subway: SubwayReducer
})

const store = configureStore({
    reducer: reducer
});


export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch