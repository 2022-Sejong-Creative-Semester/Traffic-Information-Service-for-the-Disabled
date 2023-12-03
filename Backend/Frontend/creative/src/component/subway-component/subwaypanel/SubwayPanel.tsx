import React from "react";
import styled from "styled-components";

const StyledSubwayPanel = styled.div`
display:flex;
flex-direction:column;
align-items:center;
text-align:center;
width: 19vw;
height: 85vh;
margin-right: 2vw;
font-family: 'GmarketSansMedium';
background: #FFD12D;
font-size: 2.5vw;
color: #FFFFFF;
@media (max-width:500px) {
    width:100%;
    height:10vh;
    margin:0;
    flex-direction:column;
    justify-content:space-evenly;
    font-size: 4.5vw;
    p{
        margin:0;
    }
}
`

const SubwayPanel = (props:any) => {

    return (
        <StyledSubwayPanel>
            <p>{props.text}</p>
            {props.menu}
        </StyledSubwayPanel>
    )
}

export default SubwayPanel