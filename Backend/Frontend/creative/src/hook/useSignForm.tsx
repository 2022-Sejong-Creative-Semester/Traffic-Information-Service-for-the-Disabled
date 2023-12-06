import React,{useEffect,useState} from "react"
import { useParams } from "react-router-dom";

import { api } from "../component/auth/Api.ts";


const useSignForm = () => {
    const param = useParams();
    const [signArr,SetSignArr] = useState<any[]>([""]);
    useEffect(() => {
        const sTmX = param.sTmX;
        const sTmY = param.sTmY; 
        const eTmX = param.eTmX;
        const eTmY = param.eTmY;
        const getbusNsub = async () => {
            await api.get(`/navigation/${sTmY}/${sTmX}/${eTmY}/${eTmX}/busNsub`)
            .then(res=>{
                SetSignArr([res.data])
                console.log(res.data)
            }).catch(error=>{
                console.log(error)
            })
        }
        getbusNsub();
    },[param])
    return signArr;
}



export default useSignForm;