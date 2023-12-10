import React from "react"
import classes from "./SubwayDetailPage.module.css"
import Header from "../../component/header/Header.tsx"
import SubwayPanel from "../../component/subway-component/subwaypanel/SubwayPanel.tsx"
import SubwayDetailMain from "../../component/subway-component/subwaydetail/SubwayDetailMain.tsx"
import SubwayBar from "../../component/subway-component/subwaymenubar/SubwayBar.tsx"
import MenuBar from "../../component/menu/MenuBar.tsx"

const SubwayDetailPage = () => {
    return (
        <div className={classes.subwaypage}>
            <Header />
                <div className={classes.main}>
                    <SubwayPanel text={["지하철편의시설"]} menu={<SubwayBar />} />
                    <SubwayDetailMain />
                </div>
            <MenuBar/>
        </div>
    )
}



export default SubwayDetailPage 
