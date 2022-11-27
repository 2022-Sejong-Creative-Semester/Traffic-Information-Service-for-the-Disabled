import styled from "styled-components";
import { api } from "../../Auth/Api.js";
import { Link } from "react-router-dom";
import { SubwayActions } from "../../../store/Subway-slice.js";
import { useDispatch } from "react-redux";


const StyldeSubwayItems = styled.li`
display:flex;
justify-content:space-around;
align-items:center;
width:700px;
list-style:none;
border-bottom: 1px solid #D2D2D2;
color:black;
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
    const dispatch = useDispatch();
    const clickSubway = () => {
        api.get("/subway/stationInfo/:stinCd/:stNm")
            .then(res => {
                const { data } = res;
                dispatch(SubwayActions.saveSubway(data.body[0]));
            })
    }
    return (
        <Link to="/subway/detail">
            <StyldeSubwayItems onClick={clickSubway}>
                <p className="name">{items.stNm}</p>
                <p className="line">{items.lineNum}</p>
            </StyldeSubwayItems>
        </Link>
    )
}

export default SubwayItems