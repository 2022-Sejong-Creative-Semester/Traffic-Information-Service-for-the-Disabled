import Mapping from "../component/map/Mapping"
import BusForm from "../component/busForm/BusForm"
import classes from "./BusPage.module.css"

const BusPage = () => {
    return (
        <div className={classes.page}>
            <BusForm />
            <Mapping />
        </div>
    )
}

export default BusPage