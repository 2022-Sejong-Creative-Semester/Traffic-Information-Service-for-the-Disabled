import styled from "styled-components";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { BusActions } from "../../../store/Bus-slice";

const StyledStationItem = styled.li`
display:flex;
justify-content:space-around;  
width:700px;
list-style:none;
border-bottom: 1px solid #D2D2D2;
.Name{
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 60px;
}
.id{
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
font-size: 24px;
line-height: 29px;
display: flex;
align-items: center;
text-align: center;
color: #9C9C9C;
}
`

const StationItem = (props) => {
    const { stId, stNm, tmX, tmY, arsId } = props.items
    const dispatch = useDispatch();
    const staionLocation = useSelector(state => state.stationLocation)
    const SubmitStation = () => {
        dispatch(BusActions.changeStation(props.items))
        console.log(staionLocation)
        /*axios.get(`/stationInfo/${stationId}`, {

        }).then(res => {
            const { data } = res;

        }).catch(error => {
            alert(error)
        })*/
    }
    return (
        <StyledStationItem onClick={SubmitStation}>
            <p className="Name">{stNm}</p>
            <p className="id">{arsId}</p>
        </StyledStationItem>
    )
}

export default StationItem;