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
    height:80vw;
}
`


const SubwayElevatorDetail = ({ info }) => {

    return (
        <StyledElevatorDetail>
            {info.map(element => (
                <SubwayElevatorItems
                    key={element.dtlLoc}
                    items={element} />
            ))}
        </StyledElevatorDetail>
    )
}

export default SubwayElevatorDetail;