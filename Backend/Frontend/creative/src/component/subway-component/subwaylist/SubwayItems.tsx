import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { SubwayActions } from "../../../store/Subway-slice.ts";
import { MapActions } from "../../../store/Map-slice.ts";
import { api } from "../../auth/Api.ts";
import { RootState } from "../../../store/index";

interface sbitem {
    color:any;
    idColor:string[];
    lnNm:number;
}

const SubwayItems = (props:any) => {
    const [position, setPosition] = useState("");
    const [color, setColor] = useState<string>("false");
    const dispatch = useDispatch()
    const currentSubway = useSelector((state:RootState) => state.subway.currentSubway)

    const {items} = props;
    const { stNm, lnNm, stCd } = items
    const idColor = ["#0052A4", "#00A84D", "#EF7C1C", "#00A5DE", "#996CAC", "#CD7C2F", "#747F00", "#E6186C"];
    
    useEffect(() => {
        if (currentSubway === stCd)
            setColor("false")
        else 
            setColor("true")
        const locationRecive = async () => {
            await api.get(`/subway/stationInfo/${stCd}/${stNm}`)
                .then(res => {
                    const { data } = res;
                    setPosition(data.stationinfo)
                })
        }
        locationRecive()
    }, [currentSubway,stCd,stNm])

    const ClickSubway = () => {
        if (currentSubway === stCd)
            window.location.href = `/#/subway/detail/${stCd}/${stNm}`;
        else if (currentSubway !== stCd) {
            setColor("false")
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

const StyldeSubwayItems = styled.li<sbitem>`
display:flex;
justify-content:space-between;
width:100%;
align-items:center;
list-style:none;
border-bottom: 1px solid #D2D2D2;
background-color:${props => (props.color==="true" ? "#FFFFFF" : "#FFD12D")};
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
    font-weight: ${props => (props.color==="true" ? "400" : "700")};
    font-size: 1em;
    line-height: 60px;
    color:${props => (props.color==="true" ? "#000000" : "#FFFFFF")};
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
    font-size: 1em;
    width: 2em;
    height: 2em;
    background-color:${(props:any) => (props.idColor[props.lnNm - 1])};
    border-radius:200px;
    
}
`


export default SubwayItems