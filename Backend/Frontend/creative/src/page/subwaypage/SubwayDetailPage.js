import Mapping from "../../component/map/Mapping.js"
import classes from "./SubwayDetailPage.module.css"
import Header from "../../component/header/Header.js"
import SubwayPanel from "../../component/subway-component/subwaypanel/SubwayPanel.js"
import SubwayDetail from "../../component/subway-component/subwaydetail/SubwayDetail.js"
import SubwayBar from "../../component/subway-component/subwaymenubar/SubwayBar.js"
import { useDispatch } from "react-redux"
import { SubwayActions } from "../../store/Subway-slice.js"
import { api } from "../../component/auth/Api.js"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const SubwayDetailPage = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const [info, setInfo] = useState({})
    useEffect(() => {
        const stCd = params.stCd;
        const stNm = params.stNm;
        const getDetail = async () => {
            await axios.get(`/subway/stationInfo/${stCd}/${stNm}`)

                .then(res => {
                    const { data } = res;
                    const { stationinfo } = data;
                    setInfo(stationinfo);
                    dispatch(SubwayActions.saveSubway(stationinfo))
                })
        }
        getDetail()
    }, [])
    return (
        <div className={classes.subwaypage}>
            <Header />
            <div className={classes.main}>
                <SubwayPanel text={["지하철 편의시설"]} menu={<SubwayBar />} />
                <div className={classes.subwaymain}>
                    <div className={classes.subwaylist}>
                        <SubwayDetail info={info} />
                    </div>
                    <Mapping />
                </div>
            </div>
        </div>
    )
}



export default SubwayDetailPage 
