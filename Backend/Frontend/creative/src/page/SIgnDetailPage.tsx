import React from "react";
import classes from "./SignDetailPage.module.css"
import Header from "../component/header/Header.tsx"
import MenuBar from "../component/menu/MenuBar.tsx";
import SignDetail from "../component/sign-component/SignDetail.tsx";


const SignDetailPage = () => {
    return (
        <div className={classes.signpage}>
            <Header/>
            <SignDetail/>
            <MenuBar/>
        </div>
    )
}

export default SignDetailPage