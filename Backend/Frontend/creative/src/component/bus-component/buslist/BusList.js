import styled from "styled-components";
import BusItem from "./BusItem";
import StationItem from "./StationItem"
import { useSelector } from "react-redux";
import test from "./test.json"

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
`

const BusList = () => {
    const station = useSelector(state => state.bus.station)
    const { elements } = station
    const stationCheck = useSelector(state => state.bus.stationCheck)
    return (
        <StyledList>
            {stationCheck && elements.map(element => (
                <StationItem
                    key={element.elements[0].elements[0].text}
                    items={{
                        stationId: element.elements[0].elements[0].text,
                        stationName: element.elements[4].elements[0].text
                    }}
                />
            ))}
        </StyledList>
    )
}

export default BusList;