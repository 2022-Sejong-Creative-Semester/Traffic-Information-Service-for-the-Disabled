import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { SubwayActions } from "../../../store/Subway-slice";


const SubwayItems = ({ items }) => {
    const { stNm, lnNm, stCd } = items
    const [color, setColor] = useState(true);
    const dispatch = useDispatch()
    const currentSubway = useSelector(state => state.subway.currentSubway)
    useEffect(() => {
        if (currentSubway !== stCd) {
            setColor(true)
        }
    }, [currentSubway])

    const ClickSubway = () => {
        if (currentSubway === stCd) {
            window.location.href = `/subway/detail/${stCd}/${stNm}`;
        }
        else if (currentSubway !== stCd) {
            setColor(false)
            dispatch(SubwayActions.clickSubway(stCd))
        }
    }
    return (
        <StyldeSubwayItems color={color} onClick={ClickSubway}>
            <p className="name">{stNm}</p>
            <p className="line">{lnNm}</p>
        </StyldeSubwayItems >
    )
}

const StyldeSubwayItems = styled.li`
display:flex;
justify-content:space-between;
width:100%;
align-items:center;
list-style:none;
border-bottom: 1px solid #D2D2D2;
background-color:${props => (props.color ? "#FFFFFF" : "#9255F5")};
color:black;
font-family: 'Pretendard-Regular';
:hover{
    cursor: pointer;
}
a{  
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    color:black;
    text-decoration:none;
}
.name{
    padding-left:20px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 60px;
    color:${props => (props.color ? "#000000" : "#FFFFFF")};
}
.line{
    color:#FFFFFF;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-right:20px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    width: 48px;
    height: 48px;
    background-color:#A76E00;
    border-radius:200px;
    
}
`


export default SubwayItems