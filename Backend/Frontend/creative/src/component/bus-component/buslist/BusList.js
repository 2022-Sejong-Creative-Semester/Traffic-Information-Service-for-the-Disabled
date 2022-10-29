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
    return (
        <StyledList>
            {stationCheck && stationInfo.map(element => (
                <StationItem
                    key={element.arsId}
                    items={{
                        stationId: element.arsId,
                        stationName: element.stNm
                    }}
                />
            ))}
        </StyledList>
    )
}

export default BusList;