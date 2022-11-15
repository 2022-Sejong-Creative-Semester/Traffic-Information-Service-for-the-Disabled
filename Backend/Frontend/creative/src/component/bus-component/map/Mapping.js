import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import classes from "./Mapping.module.css"
import usePosition from "../../../hook/usePosition";
import { geolocationOptions } from "../../../contents/geolocationOptions";
import axios from "axios";
import { BusActions } from "../../../store/Bus-slice";


const Mapping = () => {
    const dispatch = useDispatch()
    const stationInfo = useSelector(state => state.bus.station)
    const stationLocation = useSelector(state => state.bus.stationLocation)
    const { position, error } = usePosition(geolocationOptions)

    useEffect(() => {
        if (Object.keys(stationLocation).length !== 0) {
            createMap(stationLocation)
        }
        else if (stationInfo[0]) {
            createMap(stationInfo[0])
        }
        else if (position) {
            createMap(position)
        }
    })

    const createMap = (location) => {
        const lon = location.tmX;
        const lat = location.tmY;
        const container = document.getElementById("map");
        const options = {
            center: new window.kakao.maps.LatLng(lat, lon),
            level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        if (Array.isArray(stationInfo))
            mapcoordinate(stationInfo, map)

    }

    const mapcoordinate = (stationInfo, map) => {
        stationInfo.forEach(element => {
            const imageSrc = './image/busImage.png' // 마커이미지의 주소입니다    
            const imageSize = new window.kakao.maps.Size(64, 69)
            const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
            const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
            const markerPosition = new window.kakao.maps.LatLng(parseFloat(element.tmY - 0.0000005).toFixed(6), parseFloat(element.tmX - 0.0000005).toFixed(6))
            const marker = new window.kakao.maps.Marker({
                position: markerPosition,
                clickable: true,
                image: markerImage
            })
            window.kakao.maps.event.addListener(marker, 'click', () => {
                submitStationId(element.arsId)
            })
            marker.setMap(map)
        });
    }

    const submitStationId = (id) => {
        axios.get(`/bus/arsId/${id}`, {

        }).then(res => {
            const { data } = res;
            dispatch(BusActions.refreshBus(id))
            dispatch(BusActions.addBusInfo(data))
        }).catch(error => {
            alert(error)
        })
    }

    return (
        <div className={classes.map} id="map">
        </div>
    )
}

export default Mapping;