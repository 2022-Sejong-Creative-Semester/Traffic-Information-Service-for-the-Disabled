import React from "react";
import classes from "./SubwayBathchair.module.css"
import Header from "../../component/header/Header.tsx"
import SubwayPanel from "../../component/subway-component/subwaypanel/SubwayPanel.tsx"
import SubwayBar from "../../component/subway-component/subwaymenubar/SubwayBar.tsx"
import SubwayInfo from "../../component/subway-component/subwayinfo/SubwayInfo.tsx"
import MenuBar from "../../component/menu/MenuBar.tsx";

import { useParams } from "react-router-dom"
import { api } from "../../component/auth/Api.ts"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { SubwayActions } from "../../store/Subway-slice.ts"


const SubwayBathchair = () => {
    const params = useParams();
    const [bath, setBath] = useState([]);
    const [image, setimage] = useState<string>("");
    const dispatch = useDispatch()
    useEffect(() => {
        const stCd = params.stCd;
        const stNm = params.stNm;
        const railCd = params.railCd;
        const lnCd = params.lnCd;
        dispatch(SubwayActions.saveSubway({ stCd, stNm, railCd, lnCd }))
        const getBathChair = async () => {
            await api.get(`/subway/liftMove/${stCd}/${stNm}/${railCd}/${lnCd}`)
                .then(res => {
                    const { data } = res;
                    console.log(data)
                    setBath(data)
                })
            await api.get(`/subway/convenience/${stCd}/${stNm}/${railCd}/${lnCd}`)
                .then(res => {
                    const { data } = res;
                    setimage(data[0].imgPath)
                })
        }
        getBathChair()
    }, [dispatch,params.lnCd,params.railCd,params.stCd,params.stNm])
    
    return (
        <div className={classes.subwaypage}>
            <Header />
            <div className={classes.main}>
                <SubwayPanel text={["휠체어 관련위치"]} menu={<SubwayBar />} />
                <SubwayInfo info={bath} />
                <img alt="subwayImage" className={classes.subwayImage} src={`${image}`} />
            </div>
            <MenuBar/>
        </div>
    )
}

export default SubwayBathchair 
