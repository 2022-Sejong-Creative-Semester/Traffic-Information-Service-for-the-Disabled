import styled from "styled-components";
import BusTimer from "./BusTimer";

const StyledBusItem = styled.li`
display:flex;
justify-content:space-around;
align-items:center;
width:700px;
list-style:none;
border-bottom: 1px solid #D2D2D2;
div{
    display:flex;
    align-items:center;
}
.Name{
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 60px;
}
.direction{
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
}
.id{
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    color: #9C9C9C;
}
`

const BusItem = (props) => {
    const { busrouteId, busrouteAbrv, busType, adirection, arrmsg1 } = props.items;
    return (
        <StyledBusItem>
            <div>
                <p className="Name">{busrouteAbrv}</p>
                <p className="direction">{adirection}방면</p>
            </div>
            <p className="id">{arrmsg1}</p>
        </StyledBusItem>
    )
}

export default BusItem;