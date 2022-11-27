import { configureStore } from "@reduxjs/toolkit"
import BusReducer from "./Bus-slice.js";
import MapReducer from "./Map-slice.js"
import SubwayReducer from "./Subway-slice.js"
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";


const reducer = combineReducers({
    bus: BusReducer, map: MapReducer, subway: SubwayReducer
})

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer
});


export default store
