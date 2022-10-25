import styled from "styled-components";
import BusItem from "./BusItem";
import StationItem from "./StationItem"
import { useSelector } from "react-redux";

const StyledList = styled.ul`
box-sizing: border-box;
width: 744px;
height: 590px;
background: #FFFFFF;
border: 4px solid #CDD029;
`

const BusList = () => {
    const station = useSelector(state => state.bus.station)
    console.log(station)
    const stationCheck = useSelector(state => state.bus.stationCheck)
    return (
        <StyledList>
            {stationCheck && station.forEach(element => {
                <StationItem


                />
            })}
        </StyledList>
    )
}

export default BusList;