import React,{useEffect,useState} from "react"
import { useSelector } from "react-redux";
import {wrapPromise} from "../promise/warmPromise.ts"
import { api } from "../component/auth/Api.ts";
import { RootState } from "../store/index";


const useSignForm = () => {
    const [signArr,SetSignArr] = useState<any[]>([""]);
    let start = useSelector((state:RootState)=>state.sign.startPostion);
    let end = useSelector((state:RootState)=>state.sign.endPostion);  
    useEffect(() => {
        const getArr = async () => {
            await api.get(`/navigation/${start.tmY}/${start.tmX}/${end.tmY}/${end.tmX}/busNsub`)
            .then(res=>{
                const graphInfo = res.data.map((ele:any)=>{
                    return {
                        time:ele.info.totalTime,
                        type:ele.pathType,
                    }
                })
                const subwayLi = res.data.filter((ele:any)=>(
                    ele.pathType===3
                ))
                console.log(res.data)
                SetSignArr([res.data,subwayLi])
                return res.data
            })
        }
        getArr();
    },[start,end])
    return signArr;
}



export default useSignForm;