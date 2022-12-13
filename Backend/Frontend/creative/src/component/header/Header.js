import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BusActions } from "../../store/Bus-slice";
import { SubwayActions } from "../../store/Subway-slice";
import { MapActions } from "../../store/Map-slice";

const StyledHeader = styled.header`
display:flex;
justify-content:space-between;
align-items:center;
font-family: 'GmarketSansMedium';
font-weight: 700;
font-size: 4vw;
background-color:#FFFFFF;
border-bottom: 2px solid #EBEBEB;
width:95%;
height:15vh;
a{  
    color:#000000;
    text-decoration:none;
}
p{
    font-family: 'Pretendard-Regular';
    font-style: normal;
    font-weight: 700;
    font-size: 1.8vw;
    line-height: 48px;
    text-align: center;
    color: #5C5454;
}
@media (max-width:500px) {
    font-size:8vw;
    height:8vh;
    p{
        font-size: 4vw;
    }
}
`

const Header = () => {
    const dispatch = useDispatch();

    const reduxReset = () => {
        dispatch(BusActions.initialState())
        dispatch(SubwayActions.initialState())
        dispatch(MapActions.initialization())
    }
    return (
        <StyledHeader>
            <Link onClick={reduxReset} to="/">
                타자
            </Link>
            <p>Sejong University</p>
        </StyledHeader>
    )
}

export default Header