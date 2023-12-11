import React,{useState,Suspense} from "react"

import classes from "./SubwayTransferPage.module.css"
import Header from "../../component/header/Header.tsx"
import SubwayPanel from "../../component/subway-component/subwaypanel/SubwayPanel.tsx"
import SubwayBar from "../../component/subway-component/subwaymenubar/SubwayBar.tsx"
import SubwayTransferDetail from "../../component/subway-component/subwaytransfer/SubwayTransferDetail.tsx"
import MenuBar from "../../component/menu/MenuBar.tsx"
import Loding from "../../component/loding/Loding.tsx"

import {getTransferInfo} from "../../utils/getSubwayApi.ts"
import { useParams } from "react-router-dom"

const SubwayTranferPage = () => {
    const param = useParams();
    const stCd = param.stCd;
    const stNm = param.stNm;
    const railCd = param.railCd;
    const lnCd = param.lnCd;
    const prevStinCd = param.prevStinCd;
    const chthTgtLn = param.chthTgtLn;
    const chtnNextStinCd = param.chtnNextStinCd;
    const [image,setImage] = useState()
    return (
        <div className={classes.subwaypage}>
            <Header />
            <div className={classes.main}>
                <SubwayPanel text={["환승 이동 경로"]} menu={<SubwayBar />} />
                <Suspense fallback={<Loding/>}>
                    <SubwayTransferDetail tranferdetail={getTransferInfo(stCd,stNm,railCd,lnCd,prevStinCd,chthTgtLn,chtnNextStinCd)} setImage={setImage}/>
                    <img className={classes.detailImge} alt={image} src={image}></img>
                </Suspense>
            </div>
            
            <MenuBar/>
        </div>
    )
}



export default SubwayTranferPage 
