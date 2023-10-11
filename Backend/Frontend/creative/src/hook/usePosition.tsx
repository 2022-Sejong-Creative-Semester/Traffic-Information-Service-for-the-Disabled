import { useEffect, useState } from "react"

interface position {
    tmX:number;
    tmY:number;
}

const usePosition = (options = {}) => {
    const [curPosition, setCurPosition] = useState<position|null>(null);
    const [error, setError] = useState<String|null>(null);

    const positionSuccess = (position:any) => {
        const { latitude, longitude } = position.coords
        const tmX = longitude;
        const tmY = latitude;
        setCurPosition({ tmX, tmY })
    }

    const positionError = (errorMsg:any) => {
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

    return { curPosition, error }
}

export default usePosition