import Mapping from "../../component/map/Mapping.js"
import classes from "./SubwayDetailPage.module.css"
import SubwayBar from "../../component/subway-component/subwaymenubar/SubwayBar.js"
import SubwayDetail from "../../component/subway-component/subwaydetail/SubwayDetail.js"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { api } from "../../component/auth/Api.js"


const SubwayDetailPage = () => {
    const params = useParams()
    useEffect(() => {
        const stCd = params.stCd
        const stNm = params.stNm
        const getDetatl = async () => {
            await api.get(`/subway/stationInfo/${stCd}/${stNm}`)
                .then(res => console.log(res.data))
        }
        getDetatl()
    })
    return (
        <div className={classes.subwaypage}>
            <div>
                <div className={classes.main}>
                    <SubwayDetail />
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
