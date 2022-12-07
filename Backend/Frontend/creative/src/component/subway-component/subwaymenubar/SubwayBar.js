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
`

const SubwayBar = () => {
    const si = useSelector(state => state.subway.subwayInfo)
    console.log(si)
    return (
        <StyleMenuBar>
            <Link to={`/subway/elevator/${si.stCd}/${si.stNm}/${si.railCd}/${si.lnCd}`}><li>엘리베이터 위치</li></Link>
            <Link to={`/subway/transfer/${si.stCd}/${si.stNm}/${si.railCd}/${si.lnCd}`}><li>환승 이동 경로</li></Link>
            <Link to={`/subway/bathchair/${si.stCd}/${si.stNm}/${si.railCd}/${si.lnCd}`} ><li>휠체어 관련 위치</li></Link>
        </StyleMenuBar>
    )
}

export default SubwayBar;