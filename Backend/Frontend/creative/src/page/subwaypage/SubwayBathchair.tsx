import React from "react";
import classes from "./SubwayBathchair.module.css"
import Header from "../../component/header/Header.tsx"
import SubwayPanel from "../../component/subway-component/subwaypanel/SubwayPanel.tsx"
import { useParams } from "react-router-dom"
import { api } from "../../component/auth/Api.ts"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { SubwayActions } from "../../store/Subway-slice"
import SubwayBar from "../../component/subway-component/subwaymenubar/SubwayBar.tsx"
import SubwayInfo from "../../component/subway-component/subwayinfo/SubwayInfo.tsx"


const SubwayBathchair = () => {
    const params = useParams();
    const [bath, setBath] = useState([]);
    const [image, setimage] = useState("");
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
    }, [])
    return (
        <div className={classes.subwaypage}>
            <Header />
            <div className={classes.main}>
                <SubwayPanel text={["휠체어 관련위치"]} menu={<SubwayBar />} />
                <div className={classes.subwaymain}>
                    <div className={classes.subwaylist}>
                        <SubwayInfo info={bath} />
                        <img alt="subwayImage" className={classes.subwayImage} src={`${image}`} />
                    </div>
                </div>
            </div>
        </div>
    )
}



export default SubwayBathchair 
