import SubwayButton from "./SubwayButton.js";
import SubwayInput from "./SubwayInput.js";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { SubwayActions } from "../../../store/Subway-slice.js";
import { api } from "../../auth/Api.js";
import axios from "axios";

const StyledForm = styled.form`
    display:flex;
    width: 34.6vw;
    height: 11vh;
    border: 4px solid #9255F5;
    @media (max-width:500px){
        width: 98vw;
        height: 15vw;
    }
`


const SubwayForm = () => {
    const dispatch = useDispatch();
    const SubmitSubwayStation = (value) => {
        axios.get(`/subway/stNm/${value}`)
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