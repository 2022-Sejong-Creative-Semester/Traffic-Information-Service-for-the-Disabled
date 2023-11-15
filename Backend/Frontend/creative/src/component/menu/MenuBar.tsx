import React from "react"
import styled from "styled-components"
import { NavLink } from "react-router-dom";
import {ReactComponent as HOME} from "./menuSvg/HOME.svg";
import {ReactComponent as BUS} from "./menuSvg/BUS.svg";
import {ReactComponent as SUBWAY} from "./menuSvg/SUBWAY.svg";
import {ReactComponent as SIGN} from "./menuSvg/SIGN.svg";


const StyleMenuBar = styled.div`
display:flex;
justify-content: space-evenly;
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
        </StyleMenuBar>
    )
}
export default MenuBar