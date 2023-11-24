import React from "react";
import SubwayInput from "./SubwayInput.tsx";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { SubwayActions } from "../../../store/Subway-slice.ts";
import { api } from "../../auth/Api.ts";
import { MapActions } from "../../../store/Map-slice.ts";

const StyledForm = styled.form`
    display:flex;
    position: fixed;
    z-index: 100;
    top: 15vh;
    width: 80vw;
    height: 1vh;
`


const SubwayForm = () => {
    const dispatch = useDispatch();

    const SubmitSubwayStation = async (value:any) => {
        await api.get(`/subway/stNm/${value}`)
            .then(res => {
                const { data } = res;
                dispatch(SubwayActions.addSubwayInfo(data))
                dispatch(MapActions.Onsubwaymode())
            }).catch(error => {
                alert("데이터를 받아오지 못했습니다.")
            });

    }

    const SubwayStationData = (event:any) => {
        event.preventDefault();
        const { target: [input] } = event
        const { value } = input
        input.value = "";
        SubmitSubwayStation(value)
    }

    return (
        <StyledForm onSubmit={SubwayStationData}>
            <SubwayInput />
        </StyledForm>
    )
}

export default SubwayForm