import styled from "styled-components";
import { useSelector } from "react-redux";

const StyledPanel = styled.div`
display:flex;
flex-direction:column;
align-items:center;
width: 729px;
height: 821px;
background-color:white;
border: 4px solid #9255F5;
.name{
    display:flex;
    justify-content:center;
    width:80%;
    height:auto;
    font-weight: 600;
    font-size: 50px;
    border-bottom:2px solid;
}
.info{
    margin-left:50px;
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:start;
    font-weight: 600;
    font-size: 30px;
}
`


const SubwayPanel = () => {
    const subway = useSelector(state => state.subway.subwayInfo)
    return (
        <StyledPanel>
            <div className="name">
                <p>{subway.stinNm}</p>
            </div>
            <div className="info">
                <p>{subway.lonmAdr}</p>
                <p>{subway.roadNmAdr}</p>
            </div>
        </StyledPanel>
    )
}

export default SubwayPanel;