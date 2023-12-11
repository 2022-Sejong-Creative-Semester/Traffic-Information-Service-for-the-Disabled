import React,{Suspense} from "react";
import classes from "./SignDetailPage.module.css"
import Header from "../component/header/Header.tsx"
import MenuBar from "../component/menu/MenuBar.tsx";
import SignDetail from "../component/sign-component/SignDetail.tsx";
import Loding from "../component/loding/Loding.tsx";

import {getSignBusNSub} from "../utils/getSignApi.ts"
import { useParams } from "react-router-dom";

const SignDetailPage = () => {
    const param = useParams();
    const sTmX = param.sTmX;
    const sTmY = param.sTmY; 
    const eTmX = param.eTmX;
    const eTmY = param.eTmY;
    return (
        <div className={classes.signpage}>
            <Header/>
            <Suspense fallback={<Loding/>}>
                <SignDetail sign={getSignBusNSub(sTmY,sTmX,eTmY,eTmX)}/>
            </Suspense>
            <MenuBar/>
        </div>
    )
}

export default SignDetailPage