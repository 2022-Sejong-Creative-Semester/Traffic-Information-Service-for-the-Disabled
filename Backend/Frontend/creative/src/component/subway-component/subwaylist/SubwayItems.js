import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const StyldeSubwayItems = styled.li`
display:flex;
justify-content:space-around;
align-items:center;
width:700px;
list-style:none;
border-bottom: 1px solid #D2D2D2;
:hover{
    cursor: pointer;
}
.name{
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 60px;
}
.line{
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
}

`

const SubwayItems = ({ items }) => {
    const clickSubway = () => {
        axios.get("/subway/stationInfo/:stinCd/:stNm")
            .then(res => {
                const { data } = res;
                console.log(data.body[0]);
            })
    }
    return (
        <Link to="subway/detail">
            <StyldeSubwayItems onClick={clickSubway}>
                <p className="name">{items.stNm}</p>
                <p className="line">{items.lineNum}</p>
            </StyldeSubwayItems>
        </Link>
    )
}

export default SubwayItems