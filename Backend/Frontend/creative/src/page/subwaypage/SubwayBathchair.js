import classes from "./SubwayBathchair.module.css"
import Header from "../../component/header/Header.js"
import SubwayPanel from "../../component/subway-component/subwaypanel/SubwayPanel.js"
import { useParams } from "react-router-dom"
import { api } from "../../component/auth/Api.js"
import { useEffect, useState } from "react"
import SubwayBar from "../../component/subway-component/subwaymenubar/SubwayBar.js"
import SubwayInfo from "../../component/subway-component/subwayinfo/SubwayInfo.js"


const SubwayBathchair = () => {
    const params = useParams();
    const [bath, setBath] = useState([]);
    useEffect(() => {
        const stCd = params.stCd;
        const stNm = params.stNm;
        const railCd = params.railCd;
        const lnCd = params.lnCd;
        const getBathChair = () => {
            api.get(`subway/liftMove/${stCd}/${stNm}/${railCd}/${lnCd}`)
                .then(res => {
                    const { data } = res;
                    setBath(data)
                })
        }
        getBathChair()
    }, [])
    return (
        <div className={classes.subwaypage}>
            <Header />
            <div className={classes.main}>
                <SubwayPanel text={["휠체어 관련 위치"]} menu={<SubwayBar />} />
                <div className={classes.subwaymain}>
                    <div className={classes.subwaylist}>
                        <SubwayInfo info={bath} />
                    </div>
                </div>
            </div>
        </div>
    )
}



export default SubwayBathchair 