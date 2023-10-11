import React from "react";
import Mapping from "../../component/map/Mapping.tsx"
import SubwayForm from "../../component/subway-component/subwayform/SubwayForm.tsx"
import SubwayList from "../../component/subway-component/subwaylist/SubwayList.tsx"
import classes from "./SubwayPage.module.css"
import Header from "../../component/header/Header.tsx"
import SubwayPanel from "../../component/subway-component/subwaypanel/SubwayPanel.tsx"

const SubwayPage = () => {
    return (
        <div className={classes.subwaypage}>
            <Header />
            <div className={classes.main}>
                <SubwayPanel key="panel" text={["지하철편의시설"]} menu={null} />
                <div className={classes.subwaymain}>
                    <div className={classes.subwaylist}>
                        <SubwayForm />
                        <SubwayList />
                    </div>
                    <Mapping />
                </div>
            </div>
        </div>
    )
}



export default SubwayPage 
