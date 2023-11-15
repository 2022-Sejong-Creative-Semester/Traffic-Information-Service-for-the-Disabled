import React from "react"
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BusActions } from "../../store/Bus-slice.ts";
import { SubwayActions } from "../../store/Subway-slice.ts";
import { MapActions } from "../../store/Map-slice.ts";

const StyledHeader = styled.header`
display:flex;
justify-content:space-between;
background-color: #FFFFFF;
align-items:center;
font-family: 'GmarketSansMedium';
border-bottom: 2px solid #EBEBEB;
width:100vw;
min-height:10%;
.header_home{  
    font-size:5vw;
    color:#000000;
    text-decoration:none;
    padding-left: 5vw;
}
.header_sejong{
    font-family: 'Pretendard-Regular';
    font-style: normal;
    font-size: 2vw;
    padding-right: 5vw;
    line-height: 48px;
    color: #5C5454;
}
`

const Header = () => {
    const dispatch = useDispatch();

    const reduxReset = () => {
        dispatch(BusActions.initialState())
        dispatch(SubwayActions.initialState())
        dispatch(MapActions.initialization())
    }
    return (
        <StyledHeader>
            <Link className="header_home" onClick={reduxReset} to="/">
                타자
            </Link>
            <p className="header_sejong">Sejong University</p>
        </StyledHeader>
    )
}

export default Header