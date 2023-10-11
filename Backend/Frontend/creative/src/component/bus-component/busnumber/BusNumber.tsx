import React from "react";
import styled from "styled-components";
import RefreshButton from "../buslist/RefreshButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/index";

const StyledBusNumber = styled.header`
display:flex;
justify-content: space-between;
line-height: 60px;
align-items:center;
height:50px;
width:90%;
height:auto;
font-size:1.9vw;
font-family: 'Pretendard-Regular';
padding:0;
p{
    font-weight:bold;
    margin:0;
}
@media (max-width:500px){
    font-size:4.5vw;
    height:20%;
}
`

const BusNumber = (props:any) => {
    const busCheck = useSelector((state:RootState) => state.bus.busCheck)
    return (
        <StyledBusNumber>
            <p>{props.text}{props.count}</p>
            {busCheck && <RefreshButton />}
        </StyledBusNumber>
    )
}

export default BusNumber