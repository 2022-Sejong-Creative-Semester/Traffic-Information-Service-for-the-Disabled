import styled from "styled-components";
import axios from "axios"
import { api } from "../../auth/Api";
import { useDispatch, useSelector } from "react-redux";
import { BusActions } from "../../../store/Bus-slice";
import { MapActions } from "../../../store/Map-slice";
import { useEffect, useState } from "react";


const StationItem = (props) => {
    const [color, setColor] = useState(true)
    const { stNm, arsId, tmX, tmY } = props.items
    const dispatch = useDispatch();
    const station = useSelector(state => state.bus.currentStation)
    useEffect(() => {
        if (station !== arsId) {
            setColor(true)
        }
    }, [station])


    const ClickClass = () => {
        if (station === arsId) {
            SubmitStation();
        }
        else if (station !== arsId) {
            setColor(false)
            dispatch(BusActions.ClickStation(arsId))
            dispatch(MapActions.positioning({ tmX, tmY }))
        }
    }

    const SubmitStation = () => {
        api.get(`/bus/arsId/${arsId}`, {

        }).then(res => {
            const { data } = res;
            dispatch(BusActions.refreshBus(arsId))
            dispatch(BusActions.addBusInfo(data))
        }).catch(error => {
            alert("저상 버스가 없습니다.")
        })
    }

    return (
        <StyledStationItem color={color} onClick={ClickClass}>
            <p className="Name" > {stNm}</p >
            <p className="id">{arsId}</p>
        </StyledStationItem >
    )
}


const StyledStationItem = styled.li`
display:flex;
justify-content:space-between;  
width:100%;
list-style:none;
border-bottom: 1px solid #D2D2D2;
background-color:${props => (props.color ? "#FFFFFF" : "#CDD029")};
font-family: 'Pretendard-Regular';
:hover{
    cursor: pointer;
}

.Name{
    padding-left:20px;
    font-family: 'Pretendard-Regular';
    font-style: normal;
    font-weight: 600;
    font-size: 2vw;
    line-height: 60px;
    color:${props => (props.color ? "#000000" : "#FFFFFF")};
}

.id{
    padding-right:20px;
    font-family: 'Pretendard-Regular';
    font-style: normal;
    font-weight: 600;
    font-size: 1.7vw;
    line-height: 29px;
    display: flex;
    align-items: center;
    text-align: center;
    color:${props => (props.color ? "#9C9C9C" : "black")};
}
@media (max-width:500px){
    height:43%;
    .Name{
        font-family: 'Pretendard-Regular';
        font-size: 5vw;
    }
    .id{
        font-family: 'Pretendard-Regular';
        font-size: 3vw;
    }
}
`

export default StationItem;