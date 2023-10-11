import React from "react";
import MenuBar from "../component/menu/MenuBar.tsx";
import classes from "./MainPage.module.css"
import Header from "../component/header/Header.tsx";

const Mainpage = () => {
    return (
        <div className={classes.main}>
            <Header />
            <div className={classes.bottom}>
                <MenuBar />
            </div>
        </div>
    )
}

export default Mainpage;