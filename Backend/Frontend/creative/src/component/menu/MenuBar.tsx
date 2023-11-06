import React from "react"
import MenuBusButton from "./MenuBusButton.tsx"
import MenuSubwayButton from "./MenuSubwayButton.tsx"
import styled from "styled-components"

const StyleMenuBar = styled.div`
display:flex;
position: fixed;
bottom: 0;
justify-content: space-between;
width: 100%;
background-color: #FFD12D;
height: 10vh;
text-decoration:none;
@media (max-width:500px){
    justify-content:  space-evenly;
}
`


const MenuBar = () => {
    return (
        <StyleMenuBar>
            
        </StyleMenuBar>
    )
}
export default MenuBar