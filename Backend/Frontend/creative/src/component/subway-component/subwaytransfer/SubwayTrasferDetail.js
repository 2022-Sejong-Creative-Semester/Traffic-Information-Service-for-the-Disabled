import styled from "styled-components";
import SubwayTransferItems from "./SubwayTransferItem";

const StyledTransferDetail = styled.div`
display:flex;
flex-direction:column;
width: 749px;
height: 747px;
background-color:white;
border: 4px solid #9255F5;
overflow:auto;
margin-right: 20px;
@media (max-width:500px) {
    width:98%;
    height:80vw;
    margin-right:0;
}
`


const SubwayTransferDetail = ({ info }) => {
    const [prev, next] = info;
    return (
        <StyledTransferDetail>
            {prev?.sourceStation.map(prev => (
                next?.transferStation.map(next => (
                    <SubwayTransferItems
                        key={prev.stCd + next.stCd}
                        items={{ prev, next }} />
                ))
            ))}
        </StyledTransferDetail>
    )
}

export default SubwayTransferDetail;