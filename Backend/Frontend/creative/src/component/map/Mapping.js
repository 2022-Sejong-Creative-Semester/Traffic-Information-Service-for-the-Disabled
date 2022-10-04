import { useEffect } from "react";
import classes from "./Mapping.module.css"

const Mapping = () => {
    useEffect(() => {
        const container = document.getElementById("map");
        const options = {
            center: new window.kakao.maps.LatLng(35.85133, 127.734086),
            level: 8,
        };
        const map = new window.kakao.maps.Map(container, options);
    }, [])

    return (
        <div className={classes.map} id="map">

        </div>
    )
}

export default Mapping;