import { useEffect } from "react";
import { useSelector } from 'react-redux';
import classes from "./Mapping.module.css"
import usePosition from "../../../hook/usePosition";
import { geolocationOptions } from "../../../contents/geolocationOptions";
import axios from "axios";


const Mapping = () => {
    const stationInfo = useSelector(state => state.bus.station)
    const { position, error } = usePosition(geolocationOptions)

    useEffect(() => {
        if (position) {
            console.log(stationInfo)
            const lon = position.longitude;
            const lat = position.latitude;
            const container = document.getElementById("map");
            const options = {
                center: new window.kakao.maps.LatLng(lat, lon),
                level: 3,
            };
            const map = new window.kakao.maps.Map(container, options);
            if (Object.keys(stationInfo).length !== 0)
                mapcoordinate(stationInfo, map)
        }
    })
    const mapcoordinate = (stationInfo, map) => {
        const { elements } = stationInfo
        elements.forEach(element => {
            const { elements } = element;
            const markerPosition = new window.kakao.maps.LatLng(parseFloat(elements[6].elements[0].text - 0.0000005).toFixed(6), parseFloat(elements[5].elements[0].text - 0.0000005).toFixed(6))
            const marker = new window.kakao.maps.Marker({
                position: markerPosition,
                clickable: true
            })
            window.kakao.maps.event.addListener(marker, 'click', () => {
                submitStationId(elements[3].elements[0].text)
            })
            marker.setMap(map)
        });
    }
    const submitStationId = (id) => {
        axios.get(`/stationInfo/${id}`, {

        }.then(res => {
            const { data } = res;
            console.log(data)
        }).catch(error => {

        }))
    }
    return (
        <div className={classes.map} id="map">
        </div>
    )
}

export default Mapping;