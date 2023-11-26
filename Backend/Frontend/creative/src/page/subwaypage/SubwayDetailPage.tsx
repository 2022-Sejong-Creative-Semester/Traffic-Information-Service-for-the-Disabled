import React, { useEffect, useState } from "react"

import classes from "./SubwayDetailPage.module.css"
import Header from "../../component/header/Header.tsx"
import SubwayPanel from "../../component/subway-component/subwaypanel/SubwayPanel.tsx"
import SubwayDetail from "../../component/subway-component/subwaydetail/SubwayDetail.tsx"
import SubwayBar from "../../component/subway-component/subwaymenubar/SubwayBar.tsx"
import MenuBar from "../../component/menu/MenuBar.tsx"

import { useDispatch } from "react-redux"
import { SubwayActions } from "../../store/Subway-slice.ts"
import { api } from "../../component/auth/Api.ts"
import { useParams } from "react-router-dom"

const SubwayDetailPage = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const [info, setInfo] = useState({})

    useEffect(() => {
        const stCd = params.stCd;
        const stNm = params.stNm;
        const getDetail = async () => {
            await api.get(`/subway/stationInfo/${stCd}/${stNm}`)
                .then(res => {
                    const { data } = res;
                    const { stationinfo } = data;
                    setInfo(stationinfo);
                    dispatch(SubwayActions.saveSubway(stationinfo))
                })
        }
        getDetail()
    }, [dispatch,params.stCd,params.stNm])

    return (
        <div className={classes.subwaypage}>
            <Header />
            <div className={classes.main}>
            <SubwayPanel text={["지하철편의시설"]} menu={<SubwayBar />} />
            <SubwayDetail info={info} />
            </div>
            <MenuBar/>
        </div>
    )
}



export default SubwayDetailPage 
