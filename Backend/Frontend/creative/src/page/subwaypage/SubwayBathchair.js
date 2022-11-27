import classes from "./SubwayBathchair.module.css"
import SubwayBar from "../../component/subway-component/subwaymenubar/SubwayBar.js"
import SubwayInfo from "../../component/subway-component/subwayinfo/SubwayInfo"


const SubwayBathChairPage = () => {
    return (
        <div className={classes.main}>
            <SubwayBar />
            <div>
                <SubwayInfo />
            </div>
        </div>
    )
}



export default SubwayBathChairPage 
