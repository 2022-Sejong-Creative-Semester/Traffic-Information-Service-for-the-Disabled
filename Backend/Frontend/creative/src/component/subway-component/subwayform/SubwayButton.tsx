import React from "react";
import styled from "styled-components"

const StyledButton = styled.button`
width: 16%;
height: 100%;
background: #9255F5;
border: 1px solid #9255F5;
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

const SubwayButton = () => {
    return (
        <StyledButton ><img className="GRASS" src="./image/GRASS.png" alt="GRASS" /></StyledButton>
    )
}

export default SubwayButton