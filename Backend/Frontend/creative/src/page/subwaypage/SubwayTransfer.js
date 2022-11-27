import Mapping from "../../component/map/Mapping.js"
import classes from "./SubwayTransfer.module.css"
import SubwayBar from "../../component/subway-component/subwaymenubar/SubwayBar.js"

const SubwayTransferPage = () => {
    return (
        <div className={classes.subwaypage}>
            <div>
                <div className={classes.main}>
                    <div className={classes.subwaymeubar}>
                        <SubwayBar />
                        <Mapping />
                    </div>
                </div>
            </div>
        </div>
    )
}



export default SubwayTransferPage 
