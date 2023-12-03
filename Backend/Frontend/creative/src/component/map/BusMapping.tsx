import React,{ useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import usePosition from "../../hook/usePosition.tsx";
import { geolocationOptions } from "../../contents/geolocationOptions.tsx";
import classes from "./Mapping.module.css"
import { api } from "../auth/Api.ts";
import { BusActions } from "../../store/Bus-slice.ts";
import { RootState } from "../../store/index";

declare global {
    interface Window {
      kakao: any;
    }
  }
const Mapping = () => {
    const dispatch = useDispatch()
    const marker = useSelector((state:RootState) => state.map.marker)
    const position = useSelector((state:RootState) => state.map.position)
<<<<<<< HEAD:Backend/Frontend/creative/src/component/map/BusMapping.tsx
    const arsid = useSelector((state:RootState)=> state.bus.currentStation);
    const busmode = useSelector((state:RootState) => state.map.busmode);
    const {curPosition} = usePosition(geolocationOptions);
    const tmY = curPosition ? curPosition.tmY: position.tmY;
    const tmX = curPosition ? curPosition.tmX: position.tmX;
    useEffect(() => {
        const container = document.getElementById("busmap");
        const x = position.tmX!==0?Number(position.tmX):tmX!==0?tmX:37.55068403524657;
        const y = position.tmY!==0?Number(position.tmY):tmY!==0?tmY:127.07411251036736;
=======
    const arsid = useSelector((state:RootState) => state.bus.currentStation)
    const busmode = useSelector((state:RootState) => state.map.busmode)
    const subwaymode = useSelector((state:RootState) => state.map.subwaymode)
    const {curPosition} = usePosition();
    const tmY = curPosition ? curPosition.tmY: position.tmY;
    const tmX = curPosition ? curPosition.tmX: position.tmX;
    useEffect(() => {
        console.log(tmX,tmY);
        const container = document.getElementById("map");
>>>>>>> a4564550bd27da525e96b6fc9b5b02b8210532dc:Backend/Frontend/creative/src/component/map/Mapping.tsx
        const options = {
            center: new window.kakao.maps.LatLng(y, x),
            level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        if (busmode)
            busmapcoordinate(marker, map)
<<<<<<< HEAD:Backend/Frontend/creative/src/component/map/BusMapping.tsx
    },[tmX,tmY,busmode,arsid,position])
    
=======
        else if (subwaymode)
            subwaymapcoordinate(marker, map)
    },[tmX,tmY])

    const subwaymapcoordinate = (marker:any, map:any) => {
        const markerPosition = new window.kakao.maps.LatLng(parseFloat(String(marker.tmY - 0.0000005)).toFixed(6), parseFloat(String(marker.tmX - 0.0000005)).toFixed(6))
        const new_marker = new window.kakao.maps.Marker({
            position: markerPosition,
            clickable: true,
        })
        new_marker.setMap(map)
    }

>>>>>>> a4564550bd27da525e96b6fc9b5b02b8210532dc:Backend/Frontend/creative/src/component/map/Mapping.tsx
    const busmapcoordinate = (marker:any, map:any) => {
        marker.forEach((element:any) => {
            const imageSrc = './image/busImage.png' // 마커이미지의 주소입니다    
            const imageSize = new window.kakao.maps.Size(64, 69)
            const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
            let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
            const markerPosition = new window.kakao.maps.LatLng(parseFloat(String(element.tmY - 0.0000005)).toFixed(6), parseFloat(String(element.tmX - 0.0000005)).toFixed(6))
            const new_marker = new window.kakao.maps.Marker({
                position: markerPosition,
                clickable: true,
                image: markerImage
            })
            window.kakao.maps.event.addListener(new_marker, 'click', () => {
                submitStationId(element.arsId)
            })
            new_marker.setMap(map)
        });
    }

    const submitStationId = async (id:string) => {
        await api.get(`/bus/arsId/${id}`)
            .then(res => {
                const { data } = res;
                dispatch(BusActions.refreshBus(id))
                dispatch(BusActions.addBusInfo(data))
            }).catch(error => {
                alert("저상 버스가 없습니다.")
            })
    }

    return (
        <div className={classes.busmap} id="busmap">
        </div>
    )
}

export default Mapping;