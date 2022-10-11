import { useEffect } from "react";
import { useSelector } from 'react-redux';
import classes from "./Mapping.module.css"


const Mapping = () => {
    const stationInfo = useSelector(state => state.bus.station)
    useEffect(() => {
        const container = document.getElementById("map");
        const options = {
            center: new window.kakao.maps.LatLng(37.5505, 127.0747),
            level: 3,
        };
        console.log(stationInfo)
        const map = new window.kakao.maps.Map(container, options);
        console.log(stationInfo)
        if (Object.keys(stationInfo).length !== 0) {
            const { elements } = stationInfo
            elements.forEach(element => {
                const markerPosition = new window.kakao.maps.LatLng(element[6].elements[0].text, element[5].elements[0].text)
                const marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                    clickable: true
                })
                window.kakao.maps.event.addListener(marker, 'click', () => {
                    console.log(element[4].elements[0].text)
                })
                marker.setMap(map)
            });
        }
    })
    return (
        <div className={classes.map} id="map">
        </div>
    )
}

export default Mapping;