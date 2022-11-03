import styled from "styled-components";


const StyledBusItem = styled.li`
display:flex;
justify-content:space-around;  
width:700px;
list-style:none;
border-bottom: 1px solid #D2D2D2;
.Name{
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 60px;
}
.id{
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
font-size: 24px;
line-height: 29px;
display: flex;
align-items: center;
text-align: center;
color: #9C9C9C;
}
`

const BusItem = (props) => {
    const { busRouteId, busType, adirection, arrmsg1 } = props.items;
    return (
        <StyledBusItem>
            <p className="Name">{busRouteId}</p>
            <p className="id">{busType}</p>
        </StyledBusItem>
    )
}

export default BusItem;