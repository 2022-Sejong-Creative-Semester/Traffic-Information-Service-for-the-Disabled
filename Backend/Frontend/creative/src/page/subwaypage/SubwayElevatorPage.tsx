import React, {Suspense} from "react";
import classes from "./SubwayElevatorPage.module.css"
import Header from "../../component/header/Header.tsx"
import SubwayBar from "../../component/subway-component/subwaymenubar/SubwayBar.tsx"
import SubwayElebatorImg from "../../component/subway-component/subwayelebator/SubwayElebatorImg.tsx"
import SubwayPanel from "../../component/subway-component/subwaypanel/SubwayPanel.tsx"
import Loding from "../../component/loding/Loding.tsx";

import { useParams } from "react-router-dom"
import { getBathChair } from "../../utils/getSubwayApi.ts";
import { useDispatch } from "react-redux"
import { SubwayActions } from "../../store/Subway-slice.ts"


const SubwayElevatorPage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const stCd = params.stCd;
    const stNm = params.stNm;
    const railCd = params.railCd;
    const lnCd = params.lnCd;
    dispatch(SubwayActions.saveSubway({ stCd, stNm, railCd, lnCd }))
    return (
        <div className={classes.subwaypage}>
            <Header />
            <div className={classes.main}>
                <SubwayPanel text={["엘리베이터 위치"]} menu={<SubwayBar />} />
                <Suspense fallback={<Loding/>}>
                    <SubwayElebatorImg elevator={getBathChair(stCd,stNm,railCd,lnCd)}/>
                </Suspense>
            </div>
        </div>
    )
}
export default SubwayElevatorPage 
