import Mapping from "../../component/map/Mapping.js"
import SubwayForm from "../../component/subway-component/subwayform/SubwayForm.js"
import SubwayList from "../../component/subway-component/subwaylist/SubwayList.js"
import classes from "./SubwayPage.module.css"
import Header from "../../component/header/Header.js"
import SubwayPanel from "../../component/subway-component/subwaypanel/SubwayPanel.js"

const SubwayPage = () => {
    return (
        <div className={classes.subwaypage}>
            <Header />
            <div className={classes.main}>
                <SubwayPanel key="panel" text={["지하철편의시설"]} menu={null} />
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



export default SubwayPage 