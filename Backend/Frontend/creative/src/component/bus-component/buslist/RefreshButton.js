import styled from "styled-components";
import axios from "axios";
import { api } from "../../auth/Api.js"
import { useSelector, useDispatch } from "react-redux";
import { BusActions } from "../../../store/Bus-slice";

const StyledRefreshButton = styled.button`
width:50px;
height:50px;
border: 0;
border-radius:50px;
background-color:transparent;
img{
    width:100%;
}
`


const RefreshButton = () => {
    const dispatch = useDispatch()
    const busId = useSelector(state => state.bus.busId)
    const clickCheck = {
        check: false
    };
    const Refresh = () => {
        clickCheck.check = true;
        api.get(`/bus/arsId/${busId}`, {

        }).then(res => {
            const { data } = res;
            dispatch(BusActions.addBusInfo(data))
        }).catch(error => {
            alert(error)
        })
    }
    console.log(Node.classList)
    return (
        <StyledRefreshButton className="fresh" onClick={Refresh}>
            <img src="./image/refresh.png" alt="새로고침" />
        </StyledRefreshButton>
    )
}

export default RefreshButton