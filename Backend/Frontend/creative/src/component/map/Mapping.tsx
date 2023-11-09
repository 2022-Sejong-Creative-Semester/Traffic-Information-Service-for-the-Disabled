import React,{ useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import usePosition from "../../hook/usePosition.tsx";

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
    const arsid = useSelector((state:RootState) => state.bus.currentStation)
    const busmode = useSelector((state:RootState) => state.map.busmode)
    const subwaymode = useSelector((state:RootState) => state.map.subwaymode)
    const {curPosition} = usePosition();
    const tmY = curPosition ? curPosition.tmY: position.tmY;
    const tmX = curPosition ? curPosition.tmX: position.tmX;
    useEffect(() => {
        const container = document.getElementById("map");
        const options = {
            center: new window.kakao.maps.LatLng(tmY, tmX),
            level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        if (busmode)
            busmapcoordinate(marker, map)
        else if (subwaymode)
            subwaymapcoordinate(marker, map)
    },[tmX, tmY])

    const subwaymapcoordinate = (marker:any, map:any) => {
        const markerPosition = new window.kakao.maps.LatLng(parseFloat(String(marker.tmY - 0.0000005)).toFixed(6), parseFloat(String(marker.tmX - 0.0000005)).toFixed(6))
        const new_marker = new window.kakao.maps.Marker({
            position: markerPosition,
            clickable: true,
        })
        new_marker.setMap(map)
    }

    const busmapcoordinate = (marker:any, map:any) => {

        const currentArsid = marker.filter((id:any) => id.arsId === arsid)
        marker.forEach((element:any) => {
            const imageSrc = './image/busImage.png' // 마커이미지의 주소입니다    
            const imageSize = new window.kakao.maps.Size(64, 69)
            const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
            let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

            const markerPosition = new window.kakao.maps.LatLng(parseFloat(String(element.tmY - 0.0000005)).toFixed(6), parseFloat(String(element.tmX - 0.0000005)).toFixed(6))
            if (element.arsId !== currentArsid[0].arsId) {
                markerImage = undefined;
            }
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
        <div className={classes.map} id="map">
        </div>
    )
}

export default Mapping;