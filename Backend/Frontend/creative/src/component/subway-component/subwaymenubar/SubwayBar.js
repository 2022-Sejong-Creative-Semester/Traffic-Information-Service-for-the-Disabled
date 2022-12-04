import styled from "styled-components";
import { Link } from "react-router-dom";
import { api } from "../../auth/Api.js";

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
    color:black;
    border-radius:10px;
    padding:2.5px;
}
li:hover{
    transition: all ease 0.5s;
    color:white;
    background-color:#c0c0c0;
}
a{ 
    padding:0px 7px;
    text-decoration:none; 
    border-right:2px solid;
}
`

const SubwayBar = () => {
    const submitBahth = () => {
        api.get("/subway/liftMove/stinCd/:stinCd")
            .then(res => {
                const { data } = res;
                console.log(data.body[0])
            }
            )
    }
    return (
        <StyleMenuBar>
            <Link to="/subway"><li>홈</li></Link>
            <Link to="/subway/elevator"><li>엘리베이터 위치</li></Link>
            <Link to="/subway/transfer"><li>환승 이동 경로</li></Link>
            <Link to="/subway/bathchair" onClick={submitBahth}><li>휠체어 관련 위치</li></Link>
        </StyleMenuBar>
    )
}

export default SubwayBar;