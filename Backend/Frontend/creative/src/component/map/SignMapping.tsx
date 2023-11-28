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
    const arsid = useSelector((state:RootState)=> state.bus.currentStation);
    const {curPosition} = usePosition(geolocationOptions);
    const state = useSelector((state:RootState)=>state.sign.State);
    const tmY = curPosition ? curPosition.tmY: position.tmY;
    const tmX = curPosition ? curPosition.tmX: position.tmX;
    useEffect(() => {
        const container = document.getElementById("signmap");
        const x = position.tmX!==0?Number(position.tmX):tmX!==0?tmX:37.55068403524657;
        const y = position.tmY!==0?Number(position.tmY):tmY!==0?tmY:127.07411251036736;
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
        Endmarker.setMap(map);
        setStart(Startmarker)
        setEnd(Endmarker);
    },[tmX,tmY,arsid,position])
    
    const moveMarker = (mouseEvent:any) => {
        let latlng = mouseEvent!.latLng;
        if(state==="start"){
            start.setPosition(latlng);
            dispatch(SignActions.initializationStart(latlng))
            console.log(latlng.La)
        }
        else if(state==="end"){
            end.setPosition(latlng);
            dispatch(SignActions.initializationEnd(latlng))
        }
        window.kakao.maps.event.removeListener(map,"click", moveMarker)
    }

    const changeStateMarker = () => {
        window.kakao.maps.event.addListener(map,"click", moveMarker)
    }
    if(map&&state!=="")
        changeStateMarker();
    return (
        <div className={classes.signmap} id="signmap">
        </div>
    )
}

export default Mapping;