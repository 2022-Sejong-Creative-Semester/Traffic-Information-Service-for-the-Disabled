import Mapping from "../component/map/Mapping.js"
import BusForm from "../component/bus-component/busform/BusForm.js"
import BusList from "../component/bus-component/buslist/BusList.js"
import classes from "./BusPage.module.css"
import Header from "../component/header/Header.js"
import BusPanel from "../component/bus-component/buspanel/BusPanel.js"

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