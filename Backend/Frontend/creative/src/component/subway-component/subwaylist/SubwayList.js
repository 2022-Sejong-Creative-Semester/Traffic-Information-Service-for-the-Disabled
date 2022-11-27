import styled from "styled-components";
import SubwayItems from "./SubwayItems.js"
import { useSelector } from "react-redux";



const StyledList = styled.ul`
display:flex;
flex-direction:column;
align-items: center;
box-sizing: border-box;
width: 744px;
height: 590px;
background: #FFFFFF;
border: 4px solid #9255F5;
padding:0;
overflow:auto;
a{ 
    text-decoration:none; 
}
`

const SubwayList = () => {
    const subwayCheck = useSelector(state => state.subway.subwayCheck)
    const subway = useSelector(state => state.subway.subway)
    console.log(subway)
    console.log(subwayCheck)
    return (
        <StyledList>
            {subwayCheck && <SubwayItems
                key={subway.stNm}
                items={subway}
            />}
        </StyledList>
    )
}

export default SubwayList;