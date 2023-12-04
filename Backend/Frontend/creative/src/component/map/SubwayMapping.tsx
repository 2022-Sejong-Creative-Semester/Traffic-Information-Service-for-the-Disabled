import React,{ useEffect } from "react";
import { useSelector } from 'react-redux';

import usePosition from "../../hook/usePosition.tsx";
import { geolocationOptions } from "../../contents/geolocationOptions.tsx";
import classes from "./Mapping.module.css"
import { RootState } from "../../store/index";

declare global {
    interface Window {
      kakao: any;
    }
  }
const Mapping = () => {
    const marker = useSelector((state:RootState) => state.map.marker)
    const position = useSelector((state:RootState) => state.map.position)
    const subwaymode = useSelector((state:RootState) => state.map.subwaymode);
    const {curPosition} = usePosition(geolocationOptions);
    const tmY = curPosition ? curPosition.tmY: position.tmY;
    const tmX = curPosition ? curPosition.tmX: position.tmX;
    useEffect(() => {
        const container = document.getElementById("subwaymap");
        const x = position.tmX!==0?Number(position.tmX):tmX!==0?tmX:37.55068403524657;
        const y = position.tmY!==0?Number(position.tmY):tmY!==0?tmY:127.07411251036736;
        const options = {
            center: new window.kakao.maps.LatLng(y, x),
            level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        if (subwaymode)
            subwaymapcoordinate(marker, map)
    },[tmX,tmY,subwaymode,position])

    const subwaymapcoordinate = (marker:any, map:any) => {
        const markerPosition = new window.kakao.maps.LatLng(parseFloat(String(marker.tmY - 0.0000005)).toFixed(6), parseFloat(String(marker.tmX - 0.0000005)).toFixed(6))
        const new_marker = new window.kakao.maps.Marker({
            position: markerPosition,
            clickable: true,
        })
        new_marker.setMap(map)
    }//마커 찍는 함수

    return (
        <div className={classes.subwaymap} id="subwaymap">
        </div>
    )
}

export default Mapping;