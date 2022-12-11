import styled from "styled-components";
import BusItem from "./BusItem";
import StationItem from "./StationItem"
import { useSelector } from "react-redux";
import BusNumber from "../busnumber/BusNumber";

const StyledList = styled.ul`
display:flex;
flex-direction:column;
align-items: center;
box-sizing: border-box;
width: 35vw;
height: 68vh;
background: #FFFFFF;
border: 4px solid #CDD029 ;
padding:0;
margin:0;
overflow:auto;
@media (max-width:500px) {
    width:100%;
    height:50vw;
}
`

const BusList = () => {
    const stationInfo = useSelector(state => state.bus.station)
    const stationCheck = useSelector(state => state.bus.stationCheck)
    const busInfo = useSelector(state => state.bus.buslist)
    const busCheck = useSelector(state => state.bus.busCheck)
    return (
        <StyledList>
            {(busCheck || stationCheck) && <BusNumber text={stationCheck ? "검색결과" : "버스"} count={stationCheck ? stationInfo.length : busInfo.length} />}
            {stationCheck && stationInfo.map(element => (
                <StationItem
                    key={element.stId}
                    items={element}
                />
            ))}
            {busCheck && busInfo.map(element => (
                <BusItem
                    key={element.busrouteAbrv}
                    items={element}
                />
            ))}
        </StyledList>
    )
}

export default BusList;