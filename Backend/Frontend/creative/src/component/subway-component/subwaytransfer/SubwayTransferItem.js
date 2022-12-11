import styled from "styled-components";
import { useDispatch } from "react-redux";
import { SubwayActions } from "../../../store/Subway-slice";

const StyldeSubwayItems = styled.li`
display:flex;
justify-content:space-between;
width:100%;
align-items:center;
list-style:none;
border-bottom: 1px solid #D2D2D2;
background-color: #FFFFFF;
color:black;
font-family: 'Pretendard-Regular';
:hover{
    cursor: pointer;
}
.name{
    padding-left:20px;
    font-family: 'Pretendard-Regular';
    font-style: normal;
    font-weight: 600;
    font-size: 35px;
    line-height: 60px;
    color:#000000;
}
@media (max-width:500px){
    height:43%;
    .name{
        font-size: 4.5vw;
    }
}
`

const SubwayTransferItems = ({ items }) => {
    const { prev, next } = items
    const dispatch = useDispatch();

    const ClickSubway = () => {
        dispatch(SubwayActions.addTransfer({ prev, next }))
    }

    return (
        <StyldeSubwayItems onClick={ClickSubway}>
            <p className="name">{[`${prev.lnCd}호선 ${prev.stNm}방면 ->`, <br />, `${next.lnCd}호선 ${next.stNm}방면`]}</p>
        </StyldeSubwayItems >
    )
}



export default SubwayTransferItems