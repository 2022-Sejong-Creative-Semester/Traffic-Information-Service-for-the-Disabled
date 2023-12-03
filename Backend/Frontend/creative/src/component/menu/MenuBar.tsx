import React from "react"
import styled from "styled-components"
<<<<<<< HEAD
import { NavLink } from "react-router-dom";
=======

>>>>>>> a4564550bd27da525e96b6fc9b5b02b8210532dc
import {ReactComponent as HOME} from "./menuSvg/HOME.svg";
import {ReactComponent as BUS} from "./menuSvg/BUS.svg";
import {ReactComponent as SUBWAY} from "./menuSvg/SUBWAY.svg";
import {ReactComponent as SIGN} from "./menuSvg/SIGN.svg";

<<<<<<< HEAD

const StyleMenuBar = styled.div`
display:flex;
justify-content: space-evenly;
position: fixed;
bottom: 0;
align-items: center;
width: 100%;
min-height: 10%;
background-color: #FFD12D;
text-decoration:none;
`

const MenuBar = () => {
    return (
        <StyleMenuBar>
            <NavLink end to="/" >
                {({isActive}:{isActive:boolean})=>(    
                    isActive?<HOME fill="orange"  height="4vh"/>:<HOME fill="white"  height="4vh"/>
                )}
            </NavLink>
            <NavLink end to="/bus">
                {({isActive}:{isActive:boolean})=>(    
                    isActive?<BUS fill="orange"  height="4vh"/>:<BUS fill="white"  height="4vh"/>
                )}
            </NavLink>
            <NavLink end to="/subway">
                {({isActive}:{isActive:boolean})=>(    
                    isActive?<SUBWAY fill="orange"  height="4vh"/>:<SUBWAY fill="white"  height="4vh"/>
                )}
            </NavLink>
            <NavLink end to="/sign">
                {({isActive}:{isActive:boolean})=>(    
                    isActive?<SIGN fill="orange"  height="4vh"/>:<SIGN fill="white"  height="4vh"/>
                )}
            </NavLink>
=======



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
>>>>>>> a4564550bd27da525e96b6fc9b5b02b8210532dc
        </StyleMenuBar>
    )
}
export default MenuBar