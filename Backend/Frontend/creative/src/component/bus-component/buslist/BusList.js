import styled from "styled-components";
import BusItem from "./BusItem";
import StationItem from "./StationItem"
import { useSelector } from "react-redux";

const StyledList = styled.ul`
display:flex;
flex-direction:column;
align-items: center;
box-sizing: border-box;
width: 744px;
height: 590px;
background: #FFFFFF;
border: 4px solid #CDD029;
padding:0;
overflow:auto;
`

const BusList = () => {
    const stationInfo = useSelector(state => state.bus.station)
    const stationCheck = useSelector(state => state.bus.stationCheck)
    const busInfo = useSelector(state => state.bus.busList)
    const busCheck = useSelector(state => state.bus.busCheck)
    return (
        <StyledList>
            {stationCheck && stationInfo.map(element => (
                <StationItem
                    key={element.stId}
                    items={element}
                />
            ))}
            {busCheck && busInfo.map(element => (
                <BusItem
                    key={element.stId}
                    items={busInfo}
                />
            ))}
        </StyledList>
    )
}

export default BusList;