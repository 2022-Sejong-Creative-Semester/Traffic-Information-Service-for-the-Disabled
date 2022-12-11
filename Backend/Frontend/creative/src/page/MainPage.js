import MenuBar from "../component/menu/MenuBar.js";
import classes from "./MainPage.module.css"
import Header from "../component/header/Header.js";
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