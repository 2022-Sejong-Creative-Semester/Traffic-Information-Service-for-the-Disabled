import { wrapPromise } from "../promise/warmPromise.ts";

import { api } from "../component/auth/Api.ts";

export const getBusTime = (BusArsID:string,BusNo:number) => {
    const getBusTimeAPI = async () => {
        let arsId = BusArsID.split("-").join("");
        const getTimer = await api(`/bus/arsId/${arsId}`).then((res)=>{
            const {data} = res;
            let time = [0,0]
            data.forEach((ele:any)=>{
                if(ele.busrouteAbrv===BusNo)
                    time = [Number(ele.min),Number(ele.sec)]
            })
            return time;
        }).catch((error)=>{
            return [5,10]
        })
        return getTimer;
    }
    return {
        busTimer:wrapPromise(getBusTimeAPI())
    }
}