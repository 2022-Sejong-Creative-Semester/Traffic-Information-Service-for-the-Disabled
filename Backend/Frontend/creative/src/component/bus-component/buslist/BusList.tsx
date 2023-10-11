import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import BusItem from "./BusItem.tsx";
import StationItem from "./StationItem.tsx"
import BusNumber from "../busnumber/BusNumber.tsx";
import { RootState } from "../../../store/index";

const StyledList = styled.ul`
display:flex;
flex-direction:column;
align-items: center;
box-sizing: border-box;
width: 100%;
height: 640px;
background: #FFFFFF;
border: 4px solid #CDD029 ;
padding:0;
margin:0;
overflow:auto;
@media (max-width:500px) {
    border: 4px solid #CDD029 ;
    width:100%;
    height:30vh;
}
`


const BusList = () => {
    const stationInfo = useSelector((state:RootState )=> state.bus.station)
    const stationCheck = useSelector((state:RootState) => state.bus.stationCheck)
    const busInfo = useSelector((state:RootState) => state.bus.buslist)
    const busCheck = useSelector((state:RootState) => state.bus.busCheck)
    return (
        <StyledList>
            {(busCheck || stationCheck) && <BusNumber text={stationCheck ? "검색결과" : "버스"} count={stationCheck ? stationInfo.length : busInfo.length} />}
            {stationCheck && stationInfo.map((element:any) => (
                <StationItem
                    key={element.stId}
                    items={element}
                />
            ))}
            {busCheck && busInfo.map((element:any) => (
                <BusItem
                    key={element.busrouteAbrv}
                    items={element}
                />
            ))}
        </StyledList>
    )
}

export default BusList;