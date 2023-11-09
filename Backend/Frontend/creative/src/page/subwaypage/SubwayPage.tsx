import React from "react";
import Mapping from "../../component/map/Mapping.tsx"
import SubwayForm from "../../component/subway-component/subwayform/SubwayForm.tsx"
import SubwayList from "../../component/subway-component/subwaylist/SubwayList.tsx"
import classes from "./SubwayPage.module.css"
import Header from "../../component/header/Header.tsx"
import SubwayPanel from "../../component/subway-component/subwaypanel/SubwayPanel.tsx"
import MenuBar from "../../component/menu/MenuBar.tsx";

const SubwayPage = () => {
    return (
        <div className={classes.subwaypage}>
            <Header />

                    <Mapping />
            <MenuBar/>
        </div>
    )
}



export default SubwayPage 
