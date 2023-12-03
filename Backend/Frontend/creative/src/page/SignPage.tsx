import React from "react";
import Mapping from "../component/map/SignMapping.tsx"
import classes from "./SignPage.module.css"
import Header from "../component/header/Header.tsx"
import MenuBar from "../component/menu/MenuBar.tsx";
import SignForm from "../component/sign-component/SignForm.tsx";


const SignPage = () => {
    return (
        <div className={classes.signpage}>
            <Header/>
            <SignForm/>
            <Mapping/>
            <MenuBar/>
        </div>
    )
}

export default SignPage