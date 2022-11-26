import styled from "styled-components";
import { Link } from "react-router-dom";

const StyleMenuBar = styled.ul`
width:100%;
display:flex;
list-style:none;
justify-content: space-between;
font-family: 'Pretendard';
font-style: normal;
font-size: 28px;
line-height: 43px;

li{
    padding:0px 7px;
    color:black;
    border-radius:50px;
}
li:hover{
    color:white;
    background-color:#c0c0c0;
}
a{
    text-decoration:none; 
}
`

const SubwayBar = () => {
    return (
        <StyleMenuBar>
            <Link to="/subway"><li>역 검색</li></Link>
            <Link to="/subway/elevator"><li>엘리베이터 위치</li></Link>
            <Link to="/subway/transfer"><li>환승 이동 경로</li></Link>
            <Link to="/subway/bathchair"><li>휠체어 관련 위치</li></Link>
        </StyleMenuBar>
    )
}

export default SubwayBar;