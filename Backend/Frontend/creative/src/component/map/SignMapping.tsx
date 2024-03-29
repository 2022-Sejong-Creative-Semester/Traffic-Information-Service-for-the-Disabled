import React,{ useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import usePosition from "../../hook/usePosition.tsx";
import { geolocationOptions } from "../../contents/geolocationOptions.tsx";
import classes from "./Mapping.module.css"
import { RootState } from "../../store/index";
import { SignActions } from "../../store/Sign-slice.ts";

declare global {
    interface Window {
      kakao: any;
    }
  }
const Mapping = () => {
    const dispatch = useDispatch();
    const [map,setMap] = useState(null);
    const [start,setStart] = useState<any>(null);
    const [end,setEnd] = useState<any>(null);
    const position = useSelector((state:RootState) => state.map.position)
    const {curPosition} = usePosition(geolocationOptions);
    const state = useSelector((state:RootState)=>state.sign.State);
    const tmY = curPosition ? curPosition.tmY: position.tmY;
    const tmX = curPosition ? curPosition.tmX: position.tmX;
    useEffect(() => {
        const container = document.getElementById("signmap");
        const x = position.tmX!==0?Number(position.tmX):tmX!==0?tmX:127.07411251036736;
        const y = position.tmY!==0?Number(position.tmY):tmY!==0?tmY:37.55068403524657;
        const options = {
            center: new window.kakao.maps.LatLng(y, x),
            level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        setMap(map);
        const Startmarker = new window.kakao.maps.Marker({
            position:map.getCenter()
        })
        Startmarker.setMap(map);
        const Endmarker = new window.kakao.maps.Marker({
            position:map.getCenter()
        })
        dispatch(SignActions.initializationStart(map.getCenter()))
        dispatch(SignActions.initializationEnd(map.getCenter()))      
        Endmarker.setMap(map);
        setStart(Startmarker)
        setEnd(Endmarker);
    },[tmX,tmY,position])
    
    const moveMarker = (mouseEvent:any) => {
        let latlng = mouseEvent!.latLng;
        if(state==="시작위치 마커"){
            start.setPosition(latlng);
            dispatch(SignActions.initializationStart(latlng))
        }
        else if(state==="도착 위치 마커"){
            end.setPosition(latlng);
            dispatch(SignActions.initializationEnd(latlng))
        }
        window.kakao.maps.event.removeListener(map,"click", moveMarker)
    }

    const changeStateMarker = () => {
        window.kakao.maps.event.addListener(map,"click", moveMarker)
    }
    if(map&&state!==""){
        changeStateMarker();
    }
       
    return (
        <div className={classes.signmap} id="signmap">
        </div>
    )
}

export default Mapping;