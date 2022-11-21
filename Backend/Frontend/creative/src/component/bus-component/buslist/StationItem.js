import styled from "styled-components";
import axios from "axios"
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
        console.log(station, arsId);
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
        axios.get(`/bus/arsId/${arsId}`, {

        }).then(res => {
            const { data } = res;
            dispatch(BusActions.refreshBus(arsId))
            dispatch(BusActions.addBusInfo(data))
        }).catch(error => {
            alert(error)
        })
    }

    return (
        <StyledStationItem color={color} onClick={ClickClass}>
            < p className="Name" > {stNm}</p >
            <p className="id">{arsId}</p>
        </StyledStationItem >
    )
}


const StyledStationItem = styled.li`
display:flex;
justify-content:space-around;  
width:100%;
list-style:none;
border-bottom: 1px solid #D2D2D2;
background-color:${props => (props.color ? "white" : "#CDD029")};

:hover{
    cursor: pointer;
}

.Name{
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 60px;
    color:${props => (props.color ? "black" : "white")};
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
    color:${props => (props.color ? "#9C9C9C" : "black")};
}
`


export default StationItem;