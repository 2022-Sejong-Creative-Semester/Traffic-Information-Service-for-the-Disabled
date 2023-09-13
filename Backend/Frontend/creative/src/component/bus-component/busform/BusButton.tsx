import React from "react"
import styled from "styled-components"

const StyledButton = styled.button`
width: 16%;
height: 100%;
background: #CDD029;
border: 1px solid #CDD029;
padding:0;
.GRASS{
    width:80%;
    height:80%;
    background: transparent;
}
@media (max-width:500px){
    width:20%;
    height:100%;
}
`

const BusButton:React.FC = () => {
    return (
        <StyledButton > <img className="GRASS" src="./image/GRASS.png" alt="GRASS" /> </StyledButton>
    )
}

export default BusButton