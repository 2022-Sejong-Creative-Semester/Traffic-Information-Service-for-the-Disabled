import styled from "styled-components";
import { useSelector } from "react-redux";

const StyledDetail = styled.div`
display:flex;
flex-direction:column;
width: 749px;
height: 747px;
background-color:white;
border: 4px solid #9255F5;
.name{
    display:flex;
    align-items:center;
    width:100%;
    height:auto;
    font-weight: 600;
    font-size: 40px;
    border-bottom: 4px solid #9255F5;
}
.name p{
    margin-left:26px;
}
.line{
    display:flex;
    justify-content:center;
    align-items:center;
    color:#FFFFFF;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 70%;
    width: 48px;
    height: 48px;
    background-color:#A76E00;
    border-radius:200px;   
}
.info{
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:start;
    font-weight: 600;
    font-size: 30px;
}

@media (max-width:500px) {
    width:98%;
    height:80vw;
    .line{
        width: 8vw;
        height: 8vw;
    }
    .name{
        height:15vw;
        font-size:5vw;
    }
    .name p{
        margin-left:8vw;
    }
}
`


const SubwayDetail = ({ info }) => {
    return (
        <StyledDetail>
            <div className="name">
                <p className="line">{info.lnCd}</p>
                <p>{info.stNm}</p>
            </div>
            <div className="info">
                <p>{info.lonmAdr}</p>
                <p>{info.roadNmAdr}</p>
            </div>
        </StyledDetail>
    )
}

export default SubwayDetail;