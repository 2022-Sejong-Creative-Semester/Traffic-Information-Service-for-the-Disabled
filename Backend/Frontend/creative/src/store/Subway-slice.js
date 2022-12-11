import { createSlice } from "@reduxjs/toolkit";

const SubwaySlice = createSlice({
    name: "Subway",
    initialState: {
        subway: [],
        subwayCheck: false,
        subwayInfo: {},
        currentSubway: "",
        elevatorDetail: {
            elechack: false,
            imgPath: "",
            //elemethod: []
        }
    },
    reducers: {
        addSubwayInfo(state, action) {
            state.subway = action.payload
            state.subwayCheck = true
        },
        saveSubway(state, action) {
            state.subwayInfo = action.payload
        },
        initialState(state) {
            state.subway = [];
            state.subwayCheck = false;
            state.subwayInfo = {};
            state.currentSubway = "";
            state.elevatorDetail = {
                elechack: false,
                imgPath: "",
                //elemethod: []
            }
        },
        clickSubway(state, action) {
            state.currentSubway = action.payload;
        },
        addelevator(state, action) {
            state.elevatorDetail.imgPath = action.payload.imgPath;
            //state.elevatorDetail.elemethod = action.payload.elemethod;
            state.elevatorDetail.elechack = true;
        }
    }
})

export const SubwayActions = SubwaySlice.actions;
export default SubwaySlice.reducer;