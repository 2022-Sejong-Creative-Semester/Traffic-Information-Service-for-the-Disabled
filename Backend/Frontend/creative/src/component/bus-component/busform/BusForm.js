import BusButton from "./BusButton";
import BusInput from "./BusInput";
import styled from "styled-components";
import axios from "axios"
import { api } from "../../auth/Api";
import { MapActions } from "../../../store/Map-slice";
import { BusActions } from "../../../store/Bus-slice";
import { useDispatch } from "react-redux";


const StyledForm = styled.form`
    display:flex;
    width: 727px;
    height: 98px;
    border: 4px solid #CDD029;
`


const BusForm = () => {
    const dispatch = useDispatch();
    const SubmitBusStation = (value) => {
        api.get(`/bus/stNm/${value}`, {

        }).then(res => {
            const { data } = res;
            dispatch(BusActions.initialState())
            dispatch(MapActions.makerchacking(data))
            dispatch(BusActions.addStationInfo(data))
            dispatch(MapActions.positioning(data[0]))
        }).catch(error => {
            alert("데이터를 받아오지 못했습니다.")
        });

    }
    const BusStationData = (event) => {
        event.preventDefault();
        const { target: [input] } = event
        const { value } = input
        input.value = "";
        SubmitBusStation(value)
    }
    return (
        <StyledForm onSubmit={BusStationData}>
            <BusInput />
            <BusButton />
        </StyledForm>
    )
}

export default BusForm