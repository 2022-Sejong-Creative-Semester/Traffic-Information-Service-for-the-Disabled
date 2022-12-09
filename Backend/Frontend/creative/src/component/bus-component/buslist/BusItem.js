import styled from "styled-components";

const StyledBusItem = styled.li`
display:flex;
justify-content:space-between;
align-items:center;
width:100%;
list-style:none;
border-bottom: 1px solid #D2D2D2;
font-family: 'Pretendard-Regular';
:hover{
    cursor: pointer;
}
a{  
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    color:black;
    text-decoration:none;
}
div{
    display:flex;
    align-items:center;
}
.Name{
    padding-left:20px;
    font-family: 'Pretendard-Regular';
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 60px;
}
.direction{
    font-family: 'Pretendard-Regular';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
}
.id{
    padding-right:20px;
    font-family: 'Pretendard-Regular';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    color: #9C9C9C;
}

@media (max-width:500px){
    height:43%;
    .Name{
        font-size: 5vw;
    }
    .direction{
        font-size: 3vw;
    }
    .id{
        font-size: 3vw;
    }
}
`

const BusItem = (props) => {
    const { busrouteid, busrouteAbrv, adirection, arrmsg1 } = props.items;
    console.log(busrouteid);
    return (
        <StyledBusItem>
            <a href={`https://map.naver.com/v5/search/${busrouteAbrv}번버스/bus-route/${busrouteid}?c=0,0`} target="_blank">
                <div>
                    <p className="Name">{busrouteAbrv}</p>
                    <p className="direction">{adirection}방면</p>
                </div>
                <p className="id">{arrmsg1}</p>
            </a>
        </StyledBusItem>
    )
}

export default BusItem;