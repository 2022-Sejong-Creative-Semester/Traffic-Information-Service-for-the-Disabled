import React,{useState} from "react"
import Menu from "./Menu.tsx";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BusActions } from "../../store/Bus-slice.ts";
import { SubwayActions } from "../../store/Subway-slice.ts";
import { MapActions } from "../../store/Map-slice.ts";
import {ReactComponent as OPEN} from "./menuSvg/OPEN.svg";


const StyledHeader = styled.header`
display:flex;
position: fixed;
top: 0;
z-index: 100;
justify-content:space-between;
background-color: #FFD12D;
align-items:center;
position:fixed;
top: 0;
font-family: 'GmarketSansMedium';
border-bottom: 2px solid #EBEBEB;
width:100vw;
height:10vh;
.header_home{  
    font-size:5vw;
    color:#FFFFFF;
    text-decoration:none;
    text-align: center;
    margin-left: 4vw;
}
.header_sejong{
    font-family: 'Pretendard-Regular';
    font-style: normal;
    font-size: 2vw;
    padding-right: 5vw;
    line-height: 48px;
    color: #FFFFFF;
}
`
const StyledMenuTogle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 5vw;
`

const Header = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();


    const reduxReset = () => {
        dispatch(BusActions.initialState())
        dispatch(SubwayActions.initialState())
        dispatch(MapActions.initialization())
    }

    const handleMenuToggle = () => {
        setMenuOpen(!isMenuOpen);
    };
    return (
        <StyledHeader>
            <StyledMenuTogle>
                <OPEN onClick={handleMenuToggle}/>
                <Link className="header_home" onClick={reduxReset} to="/">
                    타자
                </Link>
                <Menu isOpen={isMenuOpen} onClose={handleMenuToggle}/>
            </StyledMenuTogle>
            <p className="header_sejong">Sejong University</p>
        </StyledHeader>
    )
}

export default Header