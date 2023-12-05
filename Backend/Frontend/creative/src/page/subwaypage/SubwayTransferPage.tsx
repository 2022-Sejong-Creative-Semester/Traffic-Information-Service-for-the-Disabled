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
import { error } from "console"

const SubwayDetailPage = () => {
    const params = useParams()
    const dispatch = useDispatch()
//
    useEffect(() => {
        const stCd = params.stCd;
        const stNm = params.stNm;
        const railCd = params.railCd;
        const lnCd = params.lnCd;
        const getDetail = async () => {
            await api.get(`/subway/transferMove/transferList/${stCd}/${stNm}/${railCd}/${lnCd}`)
                .then(res => {
                    const { data } = res;
                    console.log(data)
                }).catch(error=>{
                    console.log(error)
                })
        }
        getDetail()
    }, [])

    return (
        <div className={classes.subwaypage}>
            <Header />
            <SubwayPanel text={["지하철편의시설"]} menu={<SubwayBar />} />
            <MenuBar/>
        </div>
    )
}



export default SubwayDetailPage 
