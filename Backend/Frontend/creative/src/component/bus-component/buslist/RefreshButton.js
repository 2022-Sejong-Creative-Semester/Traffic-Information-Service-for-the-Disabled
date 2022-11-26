import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { BusActions } from "../../../store/Bus-slice";

const StyledRefreshButton = styled.button`
width:65px;
height:65px;
border: 0;
border-radius:50px;
position:sticky;
bottom:20px;
img{
    width:100%;
}
:hover{
    width:65px;
    height:65px;
    background-color:#dcdcdc;
}
img:hover{
    -webkit-animation:spin 0.4s linear;
	-moz-animation:spin 0.4 linear;
    animation:spin 0.4s linear;
}
:visited{
    width:65px;
    height:65px;
    background-color:#dcdcdc;
}
@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
`


const RefreshButton = () => {
    const dispatch = useDispatch()
    const busId = useSelector(state => state.bus.busId)
    const clickCheck = {
        check: false
    };
    const Refresh = () => {
        clickCheck.check = true;
        axios.get(`/bus/arsId/${busId}`, {

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