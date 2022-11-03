import MenuBar from "../component/menu/MenuBar.js";
import MenuExplan from "../component/menu/MenuExplan.js";
import classes from "./MainPage.module.css"
import MenuHeader from "../component/menu/MenuHeader.js";

const Mainpage = () => {
    return (
        <div className={classes.main}>
            <MenuHeader />
            <div className={classes.bottom}>
                <MenuExplan />
                <MenuBar />
            </div>
        </div>
    )
}

export default Mainpage;