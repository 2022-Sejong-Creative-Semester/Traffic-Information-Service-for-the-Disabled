import styled from "styled-components";
import RefreshButton from "../buslist/RefreshButton";
import { useSelector } from "react-redux";

const StyledBusNumber = styled.header`
display:flex;
justify-content: space-between;
line-height: 60px;
align-items:center;
height:50px;
width:90%;
height:auto;
font-size:30px;
font-family: 'Pretendard-Regular';
padding:0;
p{
    font-weight:bold;
    margin:0;
}
`

const BusNumber = (props) => {
    const busCheck = useSelector(state => state.bus.busCheck)
    return (
        <StyledBusNumber>
            <p>{props.text}{props.count}</p>
            {busCheck && <RefreshButton />}
        </StyledBusNumber>
    )
}

export default BusNumber