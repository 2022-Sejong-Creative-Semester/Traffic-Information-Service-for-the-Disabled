import { createSlice } from "@reduxjs/toolkit";

const SubwaySlice = createSlice({
    name: "Subway",
    initialState: {
        subway: [],
        subwayCheck: false,
        subwayInfo: {},
        currentSubway: "",
        transferDetail: {
            transCheck: false,
            transRoad: [],
            transferImage: ""
        },
        transprevnext: {
            prev: "",
            next: ""
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
            state.transferDetail = {
                transCheck: false,
                transRoad: [],
                transferImage: ""
            };
            state.transprevnext = {
                prev: "",
                next: ""
            };
        },
        clickSubway(state, action) {
            state.currentSubway = action.payload;
        },
        addTransfer(state, action) {
            state.transferDetail.transCheck = true;
            state.transferDetail.transRoad = action.payload;
            state.transferDetail.transferImage = action.payload[0].imgPath;
        },
        addprenex(state, action) {
            state.transprevnext.next = action.payload.next;
            state.transprevnext.prev = action.payload.prev;
        },
        initialtrans(state) {
            state.transferDetail = {
                transCheck: false,
                transRoad: [],
                transferImage: ""
            };
            state.transprevnext = {
                prev: "",
                next: ""
            }
        }
    }
})

export const SubwayActions = SubwaySlice.actions;
export default SubwaySlice.reducer;