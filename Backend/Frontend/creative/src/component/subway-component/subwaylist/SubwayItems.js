import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { SubwayActions } from "../../../store/Subway-slice";
import { MapActions } from "../../../store/Map-slice";
import { api } from "../../auth/Api";

const SubwayItems = ({ items }) => {
    const { stNm, lnNm, stCd } = items
    const [position, setPosition] = useState("");
    const [color, setColor] = useState(true);
    const dispatch = useDispatch()
    const currentSubway = useSelector(state => state.subway.currentSubway)
    const idColor = ["#0052A4", "#00A84D", "#EF7C1C", "#00A5DE", "#996CAC", "#CD7C2F", "#747F00", "#E6186C"];
    useEffect(() => {
        if (currentSubway === stCd) {
            setColor(false)
        }
        const locationRecive = async () => {
            await api.get(`/subway/stationInfo/${stCd}/${stNm}`)
                .then(res => {
                    const { data } = res;
                    setPosition(data.stationinfo)
                })
        }
        locationRecive()
    }, [currentSubway])

    const ClickSubway = () => {
        if (currentSubway === stCd) {
            window.location.href = `/#/subway/detail/${stCd}/${stNm}`;
        }
        else if (currentSubway !== stCd) {
            setColor(false)
            dispatch(MapActions.positioning(position))
            dispatch(MapActions.makerchacking(position))
            dispatch(SubwayActions.clickSubway(stCd))
        }
    }

    return (
        <StyldeSubwayItems color={color} idColor={idColor} lnNm={lnNm} onClick={ClickSubway}>
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
    font-family: 'Pretendard-Regular';
    font-style: normal;
    font-weight: 400;
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
    font-family: 'Pretendard-Regular';
    font-style: normal;
    font-weight: 600;
    font-size: 1.5vw;
    width: 48px;
    height: 48px;
    background-color:${props => (props.idColor[props.lnNm - 1])};
    border-radius:200px;
    
}
@media (max-width:500px){
    height:25%;
    .name{
        font-size: 5vw;
    }
    .line{
        font-size: 3vw;
        width: 10vw;
        height: 10vw;
    }
}
`


export default SubwayItems