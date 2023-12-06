
import React from "react"

import classes from "./SubwayTransferPage.module.css"
import Header from "../../component/header/Header.tsx"
import SubwayPanel from "../../component/subway-component/subwaypanel/SubwayPanel.tsx"
import SubwayBar from "../../component/subway-component/subwaymenubar/SubwayBar.tsx"
import SubwayTranferList from "../../component/subway-component/subwaytransfer/SubwayTransferLIst.tsx"
import MenuBar from "../../component/menu/MenuBar.tsx"

import { useParams } from "react-router-dom"

const SubwayTranferPage = () => {
    const param = useParams();
    return (
        <div className={classes.subwaypage}>
            <Header />
            <div className={classes.main}>
                <SubwayPanel text={["환승 이동 경로"]} menu={<SubwayBar />} />
                <SubwayTranferList param={param}/>
            </div>
            <MenuBar/>
        </div>
    )
}



export default SubwayTranferPage 
