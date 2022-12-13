import styled from "styled-components";
import { useDispatch } from "react-redux";
import { SubwayActions } from "../../../store/Subway-slice";


const SubwayElevatorItems = ({ items }) => {
    const { dtlLoc, imgPath } = items
    const dispatch = useDispatch();
    const ClickSubway = () => {
        dispatch(SubwayActions.addelevator({ imgPath }))
    }

    return (
        <StyldeSubwayItems onClick={ClickSubway}>
            <p className="name">{dtlLoc}</p>
        </StyldeSubwayItems >
    )
}

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
a{  
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    color:black;
    text-decoration:none;
}
.name{
    padding-left:20px;
    font-family: 'Pretendard-Regular';
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 60px;
    color:#000000;
}
@media (max-width:500px){
    height:25%;
    .name{
        font-size: 5vw;
    }
}
`


export default SubwayElevatorItems