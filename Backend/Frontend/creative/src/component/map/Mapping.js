import { useEffect } from "react";
import { useSelector } from 'react-redux';
import classes from "./Mapping.module.css"


const Mapping = () => {
    const stationInfo = useSelector(state => state.bus.station)
    console.log(stationInfo)
    useEffect(() => {
        const container = document.getElementById("map");
        const options = {
            center: new window.kakao.maps.LatLng(37.5505, 127.0747),
            level: 3,
        };
        console.log(stationInfo)
        const map = new window.kakao.maps.Map(container, options);
        /*stationInfo.forEach(element => {
            const markerPosition = new window.kakao.maps.LatLng(element.tmY, element.tmX)
            const marker = new window.kakao.maps.Marker({
                position: markerPosition,
                clickable: true
            })
            window.kakao.maps.event.addListener(marker, 'click', () => {
                console.log(element.stld)
            })
            marker.setMap(map)
        });*/
    }, [stationInfo])
    return (
        <div className={classes.map} id="map">
        </div>
    )
}

export default Mapping;