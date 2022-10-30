import styled from "styled-components";
import axios from "axios"
import { useDispatch } from "react-redux";

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
    const { stationId, stationName } = props.items
    const dispatch = useDispatch();
    console.log(stationId)
    const SubmitStation = () => {
        axios.get(`/stationInfo/${stationId}`, {

        }).then(res => {
            const { data } = res;

        }).catch(error => {
            alert(error)
        })
    }
    return (
        <StyledStationItem onClick={SubmitStation}>
            <p className="Name">{stationName}</p>
            <p className="id">{stationId}</p>
        </StyledStationItem>
    )
}

export default StationItem;