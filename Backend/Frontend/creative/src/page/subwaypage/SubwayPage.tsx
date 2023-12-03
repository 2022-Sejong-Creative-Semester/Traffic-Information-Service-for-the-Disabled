import React from "react";
import { useSelector } from "react-redux";

import Mapping from "../../component/map/SubwayMapping.tsx"
import SubwayForm from "../../component/subway-component/subwayform/SubwayForm.tsx"
import SubwayList from "../../component/subway-component/subwaylist/SubwayList.tsx"
import Header from "../../component/header/Header.tsx"
import MenuBar from "../../component/menu/MenuBar.tsx";
import { RootState } from "../../store/index";

import classes from "./SubwayPage.module.css"

const SubwayPage = () => {
    const subwaymode = useSelector((state:RootState) => state.map.subwaymode)
    return (
        <div className={classes.subwaypage}>
            <Header />
            <SubwayForm/>
            <Mapping />
            {subwaymode&&<SubwayList/>}
            <MenuBar/>
        </div>
    )
}



export default SubwayPage 
