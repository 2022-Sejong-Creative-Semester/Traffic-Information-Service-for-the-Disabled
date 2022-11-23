import SubwayButton from "./SubwayButton";
import SubwayInput from "./SubwayInput";
import styled from "styled-components";
import axios from "axios"
import { useDispatch } from "react-redux";


const StyledForm = styled.form`
    display:flex;
    width: 735px;
    height: 98px;
    border: 4px solid #9255F5
`


const SubwayForm = () => {
    const dispatch = useDispatch();
    const SubmitSubwayStation = (value) => {

        axios.get(`/subway/stNm/${value}`, {


        }).then(res => {
            const { data } = res;
            console.log(data)
        }).catch(error => {
            alert("데이터를 받아오지 못했습니다.")
        });

    }

    const SubwayStationData = (event) => {
        event.preventDefault();
        const { target: [input] } = event
        const { value } = input
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