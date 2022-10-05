import { configureStore } from "@reduxjs/toolkit"
import BusReducer from "./Bus-slice";


const store = configureStore({
    reducer: { bus: BusReducer }
});

export default store