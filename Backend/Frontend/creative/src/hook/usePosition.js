import { useEffect, useState } from "react"



const usePosition = (options = {}) => {
    const [position, setPosition] = useState();
    const [error, setError] = useState();

    const positionSuccess = (position) => {
        const { latitude, longitude } = position.coords
        const tmX = longitude;
        const tmY = latitude;
        setPosition({ tmX, tmY })
    }

    const positionError = (errorMsg) => {
        setError(errorMsg)
    }

    useEffect(() => {
        const { geolocation } = navigator
        if (!geolocation) {
            setError("좌표가 검색되지 않습니다")
            return;
        }
        geolocation.getCurrentPosition(positionSuccess, positionError, options);
    }, [options])

    return { position, error }
}

export default usePosition