import React from "react";
import classes from "./SubwayElevator.module.css"
import Header from "../../component/header/Header.tsx"
import SubwayBar from "../../component/subway-component/subwaymenubar/SubwayBar.tsx"
import SubwayPanel from "../../component/subway-component/subwaypanel/SubwayPanel.tsx"
import MenuBar from "../../component/menu/MenuBar.tsx";

import { useParams } from "react-router-dom"
import { api } from "../../component/auth/Api.ts"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { SubwayActions } from "../../store/Subway-slice.ts"

interface subEle {
    imgPath:string;
}

const SubwayElevator = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const [ElePos, setElePos] = useState<subEle[]>([{imgPath:""}]);
    useEffect(() => {
        const stCd = params.stCd;
        const stNm = params.stNm;
        const railCd = params.railCd;
        const lnCd = params.lnCd;
        dispatch(SubwayActions.saveSubway({ stCd, stNm, railCd, lnCd }))
        const getBathChair = async () => {
            await api.get(`/subway/convenience/${stCd}/${stNm}/${railCd}/${lnCd}`)
                .then(res => {
                    const { data } = res;
                    setElePos(()=>data);
                })
        }
        getBathChair()
    }, [dispatch, params.lnCd,params.railCd,params.stCd,params.stNm])
    
    return (
        <div className={classes.subwaypage}>
            <Header />
            <div className={classes.main}>
                <SubwayPanel text={["편의시설 위치"]} menu={<SubwayBar />} />
                <img alt="elevator" className={classes.elevator} src={`${ElePos[0]!.imgPath}`} />
            </div>
            <MenuBar/>
        </div>
    )
}
export default SubwayElevator 
