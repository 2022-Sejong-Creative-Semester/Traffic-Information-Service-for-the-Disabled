import React from "react";
import classes from "./MainPage.module.css"
import Header from "../component/header/Header.tsx";

const Mainpage = () => {
    return (
        <div className={classes.main}>
            <Header />
            <main className={classes.main_detail}>
                <h1 className={classes.main_title}>편리하고 쉽게, 타자.</h1>
                <p className={classes.main_explan}>교통약자도 대중교통을 쉽게 탈 수 있을때까지.<br />교통약자에게 필요한 서비스를 제공합니다.</p>
            </main>
        </div>
    )
}

export default Mainpage;