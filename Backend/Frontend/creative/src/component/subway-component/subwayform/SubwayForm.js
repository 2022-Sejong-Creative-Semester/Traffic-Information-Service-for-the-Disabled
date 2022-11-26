import SubwayButton from "./SubwayButton.js";
import SubwayInput from "./SubwayInput.js";
import styled from "styled-components";
import axios from "axios"
import { useDispatch } from "react-redux";
import { SubwayActions } from "../../../store/Subway-slice.js";
import { api } from "../../Auth/Api.js";


const StyledForm = styled.form`
    display:flex;
    width: 735px;
    height: 98px;
    border: 4px solid #9255F5
`


const SubwayForm = () => {
    const dispatch = useDispatch();
    const SubmitSubwayStation = (value) => {
        axios.get(`subway/stNm/${value}`)
            .then(res => {
                const { data } = res;
                dispatch(SubwayActions.addSubwayInfo(data))
            }).catch(error => {
                alert("데이터를 받아오지 못했습니다.")
            });

    }

    const SubwayStationData = (event) => {
        event.preventDefault();
        const { target: [input] } = event
        const { value } = input
        input.value = "";
        SubmitSubwayStation(value)
    }

    return (
        <StyledForm onSubmit={SubwayStationData}>
            <SubwayInput />
            <SubwayButton />
        </StyledForm>
    )
}

export default SubwayForm