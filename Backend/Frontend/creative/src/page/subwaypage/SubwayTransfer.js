import classes from "./SubwayBathchair.module.css"
import Header from "../../component/header/Header.js"
import SubwayBar from "../../component/subway-component/subwaymenubar/SubwayBar.js"
import SubwayPanel from "../../component/subway-component/subwaypanel/SubwayPanel.js"
import SubwayTransferDetail from "../../component/subway-component/subwaytransfer/SubwayTrasferDetail"
import { useParams } from "react-router-dom"
import { api } from "../../component/auth/Api.js"
import { useEffect, useState } from "react"

const SubwayTransfer = () => {
    const params = useParams()
    const [trans, setTrans] = useState([]);
    useEffect(() => {
        const stCd = params.stCd;
        const stNm = params.stNm;
        const railCd = params.railCd;
        const lnCd = params.lnCd;
        const getBathChair = () => {
            api.get(`subway/transferMove/transferList/${stCd}/${stNm}/${railCd}/${lnCd}`)
                .then(res => {
                    const { data } = res;
                    setTrans(data)
                })
        }
        getBathChair()
    }, [])
    return (
        <div className={classes.subwaypage}>
            <Header />
            <div className={classes.main}>
                <SubwayPanel text={["환승 이동경로"]} menu={<SubwayBar />} />
                <div className={classes.subwaymain}>
                    <div className={classes.subwaylist}>
                        <SubwayTransferDetail info={trans} />
                    </div>

                </div>
            </div>
        </div>
    )
}



export default SubwayTransfer 
