import { createSlice } from "@reduxjs/toolkit";

const SignSlice = createSlice({
    name: "Sign",
    initialState: {
        State:"",
        startPostion:{
            tmX:-1,
            tmY:-1
        },
        endPostion:{
            tmX:-1,
            tmY:-1
        }
    },
    reducers: {
        initialization(state,action){
            state.State = action.payload
        },
        
        initializationStart(state,action){
            state.startPostion.tmX = action.payload.Ma
            state.startPostion.tmY = action.payload.La 
        },
        initializationEnd(state,action){
            state.endPostion.tmX = action.payload.Ma
            state.endPostion.tmY = action.payload.La 
        }
    }
})

export const SignActions = SignSlice.actions;
export default SignSlice.reducer;