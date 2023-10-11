import React from "react";
import styled from "styled-components";
import SubwayElevatorItems from "./SubwayElevatorItem";

const StyledElevatorDetail = styled.div`
display:flex;
flex-direction:column;
width: 749px;
height: 747px;
background-color:white;
border: 4px solid #9255F5;
overflow:auto;

@media (max-width:500px) {
    width:98%;
    height:70vw;
}
`


const SubwayElevatorDetail = (props:any) => {
    const {info} = props;
    return (
        <StyledElevatorDetail>
            {info.map((element:any) => (
                <SubwayElevatorItems
                    key={element.dtlLoc}
                    items={element} />
            ))}
        </StyledElevatorDetail>
    )
}

export default SubwayElevatorDetail;