import React from "react";
import Mapping from "../component/map/Mapping.tsx"
import classes from "./BusPage.module.css"
import Header from "../component/header/Header.tsx"
import MenuBar from "../component/menu/MenuBar.tsx";

import BusPanel from "../component/bus-component/buspanel/BusPanel.tsx"
import BusForm from "../component/bus-component/busform/BusForm.tsx"
import BusList from "../component/bus-component/buslist/BusList.tsx"

const BusPage = () => {
    return (
        <div className={classes.buspage}>
            <Header />
            <Mapping />
            <BusForm />
            <BusList/>
            <MenuBar/>
        </div>
    )
}

export default BusPage