import React,{Suspense} from "react";
import { useSelector } from "react-redux";

import Mapping from "../../component/map/SubwayMapping.tsx"
import SubwayForm from "../../component/subway-component/subwayform/SubwayForm.tsx"
import SubwayList from "../../component/subway-component/subwaylist/SubwayList.tsx"
import Header from "../../component/header/Header.tsx"
import Loding from "../../component/loding/Loding.tsx";
import { RootState } from "../../store/index";

import {SubmitSubwayStation} from "../../utils/getSubwayApi.ts"

import classes from "./SubwayPage.module.css"

const SubwayPage = () => {
    const subwaymode = useSelector((state:RootState) => state.map.subwaymode)
    const subwayKeyword = useSelector((state:RootState) => state.subway.subwaykeyword)
    return (
        <div className={classes.subwaypage}>
            <Header />
            <SubwayForm />
            <Mapping />
            <Suspense fallback={<Loding/>}>
                {subwaymode&&<SubwayList data={SubmitSubwayStation(subwayKeyword)}/>}
            </Suspense>
        </div>
    )
}



export default SubwayPage 
