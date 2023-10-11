import React from "react";
import Mapping from "../component/map/Mapping.tsx"
import BusForm from "../component/bus-component/busform/BusForm.tsx"
import BusList from "../component/bus-component/buslist/BusList.tsx"
import classes from "./BusPage.module.css"
import Header from "../component/header/Header.tsx"
import BusPanel from "../component/bus-component/buspanel/BusPanel.tsx"

const BusPage = () => {
    return (
        <div className={classes.buspage}>
            <Header />
            <div className={classes.main}>
                <BusPanel />
                <div className={classes.busmain}>
                    <div className={classes.buslist}>
                        <BusForm />
                        <BusList />
                    </div>
                    <Mapping />
                </div>
            </div>
        </div>
    )
}

export default BusPage