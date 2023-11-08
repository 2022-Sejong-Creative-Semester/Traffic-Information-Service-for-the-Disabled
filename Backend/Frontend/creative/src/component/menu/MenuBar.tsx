import React from "react"
import styled from "styled-components"

import {ReactComponent as HOME} from "./menuSvg/HOME.svg";
import {ReactComponent as BUS} from "./menuSvg/BUS.svg";
import {ReactComponent as SUBWAY} from "./menuSvg/SUBWAY.svg";
import {ReactComponent as SIGN} from "./menuSvg/SIGN.svg";




const StyleMenuBar = styled.div`
display:flex;
position: fixed;
bottom: 0;
justify-content: space-evenly;
align-items: center;
width: 100%;
height: 8vh;
background-color: #FFD12D;
text-decoration:none;
@media (max-width:500px){
    justify-content:  space-evenly;
}
`

const StyleButton = styled.button`
    background-color: transparent;
    border: 0;
    .menu_img{
        fill: white;
        min-height: 4vh;
    }
`


const MenuBar = () => {
    return (
        <StyleMenuBar>
            <StyleButton><HOME fill="white"  height="4vh"/></StyleButton>
            <StyleButton><BUS fill="white"  height="4vh"/></StyleButton>
            <StyleButton><SUBWAY fill="white"  height="4vh"/></StyleButton>
            <StyleButton><SIGN fill="white"  height="4vh"/></StyleButton>
        </StyleMenuBar>
    )
}
export default MenuBar