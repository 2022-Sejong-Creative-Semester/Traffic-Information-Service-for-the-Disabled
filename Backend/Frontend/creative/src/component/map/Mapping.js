import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import classes from "./Mapping.module.css"
import { api } from "../auth/Api";
import { BusActions } from "../../store/Bus-slice";

const Mapping = () => {
    const dispatch = useDispatch()
    const marker = useSelector(state => state.map.marker)
    const position = useSelector(state => state.map.position)
    const arsid = useSelector(state => state.bus.currentStation)
    const busmode = useSelector(state => state.map.busmode)
    const subwaymode = useSelector(state => state.map.subwaymode)

    useEffect(() => {
        const container = document.getElementById("map");
        const options = {
            center: new window.kakao.maps.LatLng(position.tmY, position.tmX),
            level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        if (busmode)
            busmapcoordinate(marker, map)
        else if (subwaymode)
            subwaymapcoordinate(marker, map)
    })

    const subwaymapcoordinate = (marker, map) => {
        const markerPosition = new window.kakao.maps.LatLng(parseFloat(marker.tmY - 0.0000005).toFixed(6), parseFloat(marker.tmX - 0.0000005).toFixed(6))
        const new_marker = new window.kakao.maps.Marker({
            position: markerPosition,
            clickable: true,
        })
        new_marker.setMap(map)
    }

    const busmapcoordinate = (marker, map) => {

        const currentArsid = marker.filter(id => id.arsId === arsid)
        marker.forEach(element => {
            const imageSrc = './image/busImage.png' // 마커이미지의 주소입니다    
            const imageSize = new window.kakao.maps.Size(64, 69)
            const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
            let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

            const markerPosition = new window.kakao.maps.LatLng(parseFloat(element.tmY - 0.0000005).toFixed(6), parseFloat(element.tmX - 0.0000005).toFixed(6))
            if (element.arsId !== currentArsid[0]?.arsId) {
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

    const submitStationId = async (id) => {
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