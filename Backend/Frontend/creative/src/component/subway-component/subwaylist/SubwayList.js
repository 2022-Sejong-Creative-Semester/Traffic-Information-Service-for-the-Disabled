import styled from "styled-components";
import SubwayItems from "./SubwayItems.js";
import SubwayNumber from "../subwaynumber/SubwayNumber.js";
import { useSelector } from "react-redux";



const StyledList = styled.ul`
display:flex;
flex-direction:column;
align-items: center;
box-sizing: border-box;
width: 735px;
height: 644px;
background: #FFFFFF;
border: 4px solid #9255F5;
padding:0;
margin:0;
overflow:auto;
a{ 
    text-decoration:none; 
}
`

const SubwayList = () => {
    const subwayCheck = useSelector(state => state.subway.subwayCheck)
    const subway = useSelector(state => state.subway.subway)
    return (
        <StyledList>
            {subwayCheck && <SubwayNumber count={subway.length} />}
            {subwayCheck && subway.map(elemnet =>
                <SubwayItems
                    key={elemnet.stCd}
                    items={elemnet}
                />)}
        </StyledList>
    )
}

export default SubwayList;