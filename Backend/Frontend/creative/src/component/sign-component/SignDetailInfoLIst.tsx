import React from "react";
import styled from "styled-components";

import {moveSubway} from "./signUtil.tsx"
import BusTimer from "../bus-component/buslist/BusTimer.tsx"

import useBusTimer from "../../hook/useBusTImer.tsx";

const StyledSignInfoList = styled.ul`
    display: flex;
    flex-direction: column;
    padding: 0;
`

const StyledSignInfoListDetail = styled.li`
    font-size: 0.8em;
`

const StyledSignInfoSubway = styled.button`
    display: flex;
    border: none;
    font-family: "Pretendard-Regular";
    font-style: normal;
    background-color: white;
    font-size: 1em;
    padding: 0;
    margin: 1em 0;
`


const SignDetailInfoList = ({info}:any) => {
    const timer = useBusTimer(info.startArsID,info.lane[0].busNo)
    if(info.trafficType===2){//버스
        return (
            <StyledSignInfoList>
                <div>{info.startName} <BusTimer timer={timer}/></div>
                {info.passStopList.stations.map((ele:any)=>(
                    <StyledSignInfoListDetail key={ele.stationName}>{ele.stationName}</StyledSignInfoListDetail>
                ))}
            </StyledSignInfoList>
        )
    }
    else if(info.trafficType===1){//지하철
        return (
            <StyledSignInfoList>
                <StyledSignInfoSubway onClick={()=>moveSubway(info.passStopList.stations[0].stationID,info.passStopList.stations[0].stationName)}>{info.startName} 편의시설</StyledSignInfoSubway>
                {info.passStopList.stations.map((ele:any)=>(
                    <StyledSignInfoListDetail key={ele.stationName}>{ele.stationName}</StyledSignInfoListDetail>
                ))}
                <StyledSignInfoSubway onClick={()=>moveSubway(info.passStopList.stations.at(-1).stationID,info.passStopList.stations.at(-1).stationName)}>{info.endName} 편의시설</StyledSignInfoSubway>
            </StyledSignInfoList>
        )
    }
}

export default SignDetailInfoList