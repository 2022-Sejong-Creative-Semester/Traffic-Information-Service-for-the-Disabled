import styled from "styled-components";
import { useSelector } from "react-redux";

const StyledElevatorMap = styled.div`
display:flex;
flex-direction:column;
width: 700px;
height: 45%;
background-color:white;
border: 4px solid #9255F5;
overflow:auto;
@media (max-width:500px) {
    width:98%;
    height:50vw;
}

`

const SubwayElevatorMap = () => {
    const elevatorDetail = useSelector(state => state.subway.elevatorDetail)

    return (
        <StyledElevatorMap>

        </StyledElevatorMap>
    )
}

export default SubwayElevatorMap