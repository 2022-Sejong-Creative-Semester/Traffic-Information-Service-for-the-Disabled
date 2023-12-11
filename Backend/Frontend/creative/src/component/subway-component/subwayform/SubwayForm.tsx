import React from "react";
import SubwayInput from "./SubwayInput.tsx";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { MapActions } from "../../../store/Map-slice.ts";
import { SubwayActions } from "../../../store/Subway-slice.ts";
const StyledForm = styled.form`
    display:flex;
    position: fixed;
    z-index: 10;
    top: 15vh;
    width: 80vw;
    height: 1vh;
`

const SubwayForm = () => {
    const dispatch = useDispatch();
    const SubwayStationData = (event:any) => {
        event.preventDefault();
        const { target: [input] } = event
        const { value } = input
        input.value = "";
        dispatch(MapActions.Onsubwaymode())
        dispatch(SubwayActions.addSubwayKeyword(value))
    }

    return (
        <StyledForm onSubmit={SubwayStationData}>
            <SubwayInput />
        </StyledForm>
    )
}

export default SubwayForm