import styled from "styled-components";
import BusItem from "./BusItem";

const StyledList = styled.ul`
box-sizing: border-box;
width: 744px;
height: 590px;
background: #FFFFFF;
border: 4px solid #CDD029;
`

const BusList = () => {
    return (
        <StyledList>
            <BusItem />
        </StyledList>
    )
}

export default BusList;