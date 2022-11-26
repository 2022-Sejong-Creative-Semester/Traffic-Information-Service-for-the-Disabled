import Mapping from "../component/map/Mapping.js"
import BusForm from "../component/bus-component/busform/BusForm.js"
import BusList from "../component/bus-component/buslist/BusList.js"
import classes from "./BusPage.module.css"

const BusPage = () => {
    return (<div className={classes.buspage}>
        <div>
            <header>저상버스</header>
            <div className={classes.main}>
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