import React, {useState,useEffect} from "react"
import { api } from "../component/auth/Api.ts"



const useBusTimer = (BusArsID:string,BusNo:number) => {
    const [timer,setTimer] = useState(["0","0"])
    useEffect(()=> {
        const getBusTime = async () => {
            let arsId = BusArsID.split("-").join("");
            await api(`/bus/arsId/${arsId}`).then((res)=>{
                const {data} = res;
                data.forEach((ele:any)=>{
                    if(ele.busrouteAbrv===BusNo)
                        setTimer(()=>[ele.min,ele.sec]);
                })
            }).catch((error)=>{
                setTimer(()=>["5","10"])
            })
        }
        if(typeof BusArsID==="string")
            getBusTime();
    },[])
    return timer
}

export default useBusTimer;