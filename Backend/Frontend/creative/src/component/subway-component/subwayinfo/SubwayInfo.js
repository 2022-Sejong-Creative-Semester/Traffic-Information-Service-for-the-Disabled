import styled from "styled-components";
import SubwayBathchairInfo from "../subwaybath/SubwayBathChairInfo";

const StyledInfo = styled.div`
display:flex;
flex-direction:column;
width: 749px;
height: 747px;
background-color:white;
border: 4px solid #9255F5;
overflow:auto;

@media (max-width:500px){
    margin:0;
    width: 100%;
    height: 15vw;
}
`

const SubwayInfo = ({ info }) => {
    return (
        <StyledInfo>
            {info.map((element, index) => (
                <SubwayBathchairInfo
                    key={index}
                    mvTpOrdr={element.mvTpOrdr}
                    mvContDtl={element.mvContDtl}
                />
            ))}
        </StyledInfo>
    )
}


export default SubwayInfo