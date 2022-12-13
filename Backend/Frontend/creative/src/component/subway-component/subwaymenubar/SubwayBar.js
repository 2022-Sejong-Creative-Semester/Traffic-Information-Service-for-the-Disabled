import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const StyleMenuBar = styled.ul`
display:flex;
flex-direction:column;
list-style:none;
align-items: start;
font-size: 30px;
line-height: 36px;
padding:0;
li{
    display:flex;
    color:black;
    margin-bottom:10px;
    color: #FFFFFF;
    padding-top:30px;
}

a{ 
    width:246px;
    text-decoration:none;
    border-bottom: 2px solid;
    border-color:#FFFFFF;
}

@media (max-width:500px){
    flex-direction: row;
    justify-content:space-even;
    font-size:4vw;
    margin:0;
    li{
        margin:0;
        padding:0;
    }
    a{
        display:flex;
        justify-content:center;
        width:31vw;
        font-size:3.5vw;
    }
}
`

const SubwayBar = () => {
    const si = useSelector(state => state.subway.subwayInfo)
    return (
        <StyleMenuBar>
            <Link to={`/subway/elevator/${si.stCd}/${si.stNm}/${si.railCd}/${si.lnCd}`}><li>편의시설 위치</li></Link>
            <Link to={`/subway/transfer/${si.stCd}/${si.stNm}/${si.railCd}/${si.lnCd}`}><li>환승 이동 경로</li></Link>
            <Link to={`/subway/bathchair/${si.stCd}/${si.stNm}/${si.railCd}/${si.lnCd}`} ><li>휠체어 관련 위치</li></Link>
        </StyleMenuBar>
    )
}

export default SubwayBar;