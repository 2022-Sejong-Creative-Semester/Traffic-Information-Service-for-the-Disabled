import classes from "./SubwayTransfer.module.css"
import Header from "../../component/header/Header.js"
import SubwayBar from "../../component/subway-component/subwaymenubar/SubwayBar.js"
import SubwayPanel from "../../component/subway-component/subwaypanel/SubwayPanel.js"
import SubwayTransferDetail from "../../component/subway-component/subwaytransfer/SubwayTrasferDetail.js"

import { useParams } from "react-router-dom"
import { api } from "../../component/auth/Api.js"
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { SubwayActions } from "../../store/Subway-slice"

const SubwayTransfer = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const [trans, setTrans] = useState([]);
    const transcheck = useSelector(state => state.subway.transferDetail.transCheck)
    const tranferImage = useSelector(state => state.subway.transferDetail.transferImage)

    useEffect(() => {
        const stCd = params.stCd;
        const stNm = params.stNm;
        const railCd = params.railCd;
        const lnCd = params.lnCd;
        dispatch(SubwayActions.saveSubway({ stCd, stNm, railCd, lnCd }))
        const getBathChair = async () => {
            await axios.get(`/subway/transferMove/transferList/${stCd}/${stNm}/${railCd}/${lnCd}`)

                .then(res => {
                    const { data } = res;
                    setTrans(data)
                }).catch(res => {
                    alert("환승역이 아닙니다.")
                    window.location.href = `/#/subway/detail/${stCd}/${stNm}`;
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
                    <SubwayTransferDetail info={trans} />
                    <div className={classes.subwaylist}>
                        {transcheck && <img className="transfer" src={`${tranferImage}`} />}
                    </div>

                </div>
            </div>
        </div>
    )
}



export default SubwayTransfer 
