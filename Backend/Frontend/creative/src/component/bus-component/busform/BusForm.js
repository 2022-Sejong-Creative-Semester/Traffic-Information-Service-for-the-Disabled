import BusButton from "./BusButton";
import BusInput from "./BusInput";
import styled from "styled-components";
import axios from "axios"
import { BusActions } from "../../../store/Bus-slice";
import { useDispatch } from "react-redux";


const StyledForm = styled.form`
    display:flex;
    width: 735px;
    height: 98px;
    border: 4px solid #CDD029
`


const BusForm = () => {
    const dispatch = useDispatch();
    const SubmitBusStation = (value) => {

        axios.get(`/bus/stNm/${value}`, {

        }).then(res => {
            const { data } = res;
            dispatch(BusActions.addStationInfo(data))
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
            <BusInput placeholder="버스정류장 이름을 입력해주세요." />
            <BusButton />
        </StyledForm>
    )
}

export default BusForm