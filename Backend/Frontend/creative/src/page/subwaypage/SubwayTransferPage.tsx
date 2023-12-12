import React,{Suspense} from "react"

import classes from "./SubwayTransferPage.module.css"
import Header from "../../component/header/Header.tsx"
import SubwayPanel from "../../component/subway-component/subwaypanel/SubwayPanel.tsx"
import SubwayBar from "../../component/subway-component/subwaymenubar/SubwayBar.tsx"
import SubwayTranferList from "../../component/subway-component/subwaytransfer/SubwayTransferLIst.tsx"
import Loding from "../../component/loding/Loding.tsx"
import {getTransferDetail} from "../../utils/getSubwayApi.ts"

import { useParams } from "react-router-dom"

const SubwayTranferPage = () => {
    const param = useParams();
    const stCd = param.stCd;
    const stNm = param.stNm;
    const railCd = param.railCd;
    const lnCd = param.lnCd;
    return (
        <div className={classes.subwaypage}>
            <Header />
            <div className={classes.main}>
                <SubwayPanel text={["환승 이동 경로"]} menu={<SubwayBar />} />
                <Suspense fallback={<Loding/>}>
                    <SubwayTranferList tranfer={getTransferDetail(stCd,stNm,railCd,lnCd)}/>
                </Suspense>
            </div>
        </div>
    )
}



export default SubwayTranferPage 
