import { useEffect } from "react";
import classes from "./Mapping.module.css"
import test from "./test.json"
import axios from "axios"


const Mapping = () => {
    const maptest = JSON.parse(JSON.stringify(test))
    useEffect(() => {

        axios.get(`/station`, {

        }).then(res => {
            const { data } = res;
            console.log(data)

        }).catch(error => {
            alert("데이터를 받아오지 못했습니다.")
        });


        const container = document.getElementById("map");
        const options = {
            center: new window.kakao.maps.LatLng(37.5505, 127.0747),
            level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        maptest.forEach(element => {
            const markerPosition = new window.kakao.maps.LatLng(element.tmY, element.tmX)
            const marker = new window.kakao.maps.Marker({
                position: markerPosition,
                clickable: true
            })
            window.kakao.maps.event.addListener(marker, 'click', () => {
                console.log(element.stld)
            })
            marker.setMap(map)
        });
    }, [])

    return (
        <div className={classes.map} id="map">
        </div>
    )
}

export default Mapping;