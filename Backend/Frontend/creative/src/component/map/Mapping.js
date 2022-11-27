import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import classes from "./Mapping.module.css"
import axios from "axios";
import { BusActions } from "../../store/Bus-slice";
import { MapActions } from "../../store/Map-slice";

const Mapping = () => {
    const dispatch = useDispatch()
    const marker = useSelector(state => state.map.marker)
    const position = useSelector(state => state.map.position)
    useEffect(() => {
        const container = document.getElementById("map");
        const options = {
            center: new window.kakao.maps.LatLng(position.tmY, position.tmX),
            level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        if (Array.isArray(marker))
            mapcoordinate(marker, map)
    })

    const mapcoordinate = (marker, map) => {
        marker.forEach(element => {
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
            console.log(data)
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