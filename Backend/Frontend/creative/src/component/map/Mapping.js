import { useEffect } from "react";
import { useSelector } from 'react-redux';
import usePosition from "../../hook/usePosition.js"
import classes from "./Mapping.module.css"
import { geolocationOptions } from "../../contents/geolocationOptions.js"


const Mapping = () => {
    const stationInfo = useSelector(state => state.bus.station)

    useEffect(() => {
        const container = document.getElementById("map");
        const options = {
            center: new window.kakao.maps.LatLng(126.97715676912787, 37.566691289635735),
            level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        //map.setZoomable(false);
        if (Object.keys(stationInfo).length !== 0)
            mapcoordinate(stationInfo, map)
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
                console.log(elements[3].elements[0].text)
            })
            marker.setMap(map)
        });
    }
    return (
        <div className={classes.map} id="map">
        </div>
    )
}

export default Mapping;