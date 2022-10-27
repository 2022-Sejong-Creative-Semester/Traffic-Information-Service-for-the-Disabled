import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import classes from "./Mapping.module.css"
import usePosition from "../../../hook/usePosition";
import { geolocationOptions } from "../../../contents/geolocationOptions";
import axios from "axios";


const Mapping = () => {
    const dispatch = useDispatch()
    const stationInfo = useSelector(state => state.bus.station)
    const { position, error } = usePosition(geolocationOptions)
    useEffect(() => {
        if (position) {
            const lon = position.longitude;
            const lat = position.latitude;
            const container = document.getElementById("map");
            const options = {
                center: new window.kakao.maps.LatLng(lat, lon),
                level: 3,
            };
            const map = new window.kakao.maps.Map(container, options);
            if (Array.isArray(stationInfo))
                mapcoordinate(stationInfo, map)
        }
    })
    const mapcoordinate = (stationInfo, map) => {
        stationInfo.forEach(element => {
            const markerPosition = new window.kakao.maps.LatLng(parseFloat(element.tmY - 0.0000005).toFixed(6), parseFloat(element.tmX - 0.0000005).toFixed(6))
            const marker = new window.kakao.maps.Marker({
                position: markerPosition,
                clickable: true
            })
            window.kakao.maps.event.addListener(marker, 'click', () => {
                submitStationId(element.arsId)
            })
            marker.setMap(map)
        });
    }

    const submitStationId = (id) => {
        console.log(id)
        axios.get(`/stationInfo/${id}`, {

        }).then(res => {
            const { data } = res;
            console.log(data)
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