import Mapping from "../../component/map/Mapping.js"
import classes from "./SubwayDetailPage.module.css"
import SubwayBar from "../../component/subway-component/subwaymenubar/SubwayBar.js"
import SubwayPanel from "../../component/subway-component/subwaypanel/SubwayPanel.js"

const SubwayDetailPage = () => {
    return (
        <div className={classes.subwaypage}>
            <div>
                <div className={classes.main}>
                    <SubwayPanel />
                    <div className={classes.subwaymeubar}>
                        <SubwayBar />
                        <Mapping />
                    </div>
                </div>
            </div>
        </div>
    )
}



export default SubwayDetailPage 
