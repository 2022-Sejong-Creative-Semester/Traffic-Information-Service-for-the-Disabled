import SubwayElevatorDetail from "../../component/subway-component/subwayElevator/SubwayElevatorDetail"
import SubwayElevatorMap from "../../component/subway-component/subwayElevator/SubwayElevatorMap"
import classes from "./SubwayElevator.module.css"
import Header from "../../component/header/Header.js"
import SubwayBar from "../../component/subway-component/subwaymenubar/SubwayBar.js"
import SubwayPanel from "../../component/subway-component/subwaypanel/SubwayPanel.js"
import { useParams } from "react-router-dom"
import { api } from "../../component/auth/Api.js"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const SubwayElevator = () => {
    const params = useParams()
    const elevatorDetail = useSelector(state => state.subway.elevatorDetail)
    const [ElePos, setElePos] = useState([]);
    useEffect(() => {
        const stCd = params.stCd;
        const stNm = params.stNm;
        const railCd = params.railCd;
        const lnCd = params.lnCd;
        const getBathChair = async () => {
            await api.get(`subway/ElevatorMove/${stCd}/${stNm}/${railCd}/${lnCd}`)
                .then(res => {
                    const { data } = res;

                })
            await api.get(`subway/convenience/${stCd}/${stNm}/${railCd}/${lnCd}/EV`)
                .then(res => {
                    const { data } = res;
                    setElePos(data)

                })
        }
        getBathChair()
    }, [])
    return (
        <div className={classes.subwaypage}>
            <Header />
            <div className={classes.main}>
                <SubwayPanel text={["엘리베이터 위치"]} menu={<SubwayBar />} />
                <div className={classes.subwaymain}>
                    <SubwayElevatorDetail info={ElePos} />
                    <div className={classes.subwaylist}>
                        <SubwayElevatorMap />
                        <img src={`${elevatorDetail.imgPath}`} />
                    </div>
                </div>
            </div>
        </div>
    )
}



export default SubwayElevator 
