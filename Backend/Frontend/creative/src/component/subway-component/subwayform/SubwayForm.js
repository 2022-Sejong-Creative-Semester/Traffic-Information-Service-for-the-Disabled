import SubwayButton from "./SubwayButton";
import SubwayInput from "./SubwayInput";
import styled from "styled-components";
import axios from "axios"
import { BusActions } from "../../../store/Bus-slice";
import { MapActions } from "../../../store/Map-slice";
import { useDispatch } from "react-redux";


const StyledForm = styled.form`
    display:flex;
    width: 735px;
    height: 98px;
    border: 4px solid #9255F5
`


const SubwayForm = () => {
    const dispatch = useDispatch();
    const SubmitBusStation = (value) => {

        axios.get(`/subway/liftMove/stinCd/${value}`, {

        }).then(res => {
            const { data } = res;
            console.log(data)
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
            <SubwayInput placeholder="버스정류장 이름을 입력해주세요." />
            <SubwayButton />
        </StyledForm>
    )
}

export default SubwayForm