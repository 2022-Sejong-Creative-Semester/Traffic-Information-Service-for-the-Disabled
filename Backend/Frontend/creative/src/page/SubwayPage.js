import Mapping from "../component/map/Mapping.js"
import SubwayForm from "../component/subway-component/subwayform/SubwayForm.js"
import SubwayList from "../component/subway-component/subwaylist/SubwayList.js"
import classes from "./SubwayPage.module.css"

const SubwayPage = () => {

    return (<div className={classes.page}>
        <div className={classes.list}>
            <SubwayForm />
            <SubwayList />
        </div>
        <Mapping />
    </div>
    )
}

export default SubwayPage 
