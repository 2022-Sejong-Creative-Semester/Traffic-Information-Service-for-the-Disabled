import Mapping from "../../component/map/Mapping.js"
import SubwayForm from "../../component/subway-component/subwayform/SubwayForm.js"
import SubwayList from "../../component/subway-component/subwaylist/SubwayList.js"
import classes from "./SubwayElevator.module.css"
import Header from "../../component/header/Header.js"
import SubwayPanel from "../../component/subway-component/subwaypanel/SubwayPanel.js"

const SubwayElevator = () => {
    return (
        <div className={classes.subwaypage}>
            <Header />
            <div className={classes.main}>
                <SubwayPanel text={["엘리베이터", <br />, "위치"]} />
                <div className={classes.subwaymain}>
                    <div className={classes.subwaylist}>
                        <SubwayForm />
                        <SubwayList />
                    </div>
                    <Mapping />
                </div>
            </div>
        </div>
    )
}



export default SubwayElevator 