import React from "react";
import styled from "styled-components";

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


    return (
        <StyledElevatorMap>

        </StyledElevatorMap>
    )
}

export default SubwayElevatorMap