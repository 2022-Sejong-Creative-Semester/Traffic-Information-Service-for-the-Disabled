import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BusActions } from "../../store/Bus-slice";
import { SubwayActions } from "../../store/Subway-slice";
import { MapActions } from "../../store/Map-slice";

const StyledHeader = styled.header`
display:flex;
align-items:center;
font-family: 'GmarketSansMedium';
font-weight: 700;
font-size: 60px;
background-color:#FFFFFF;
border-bottom: 2px solid #EBEBEB;
width:95%;
height:100px;
a{  
    color:#000000;
    text-decoration:none;
}
`

const Header = () => {
    const dispatch = useDispatch();

    const reduxReset = () => {
        console.log("asd")
        dispatch(BusActions.initialState())
        dispatch(SubwayActions.initialState())
        dispatch(MapActions.initialization())
    }
    return (
        <StyledHeader>
            <Link onClick={reduxReset} to="/">
                타자
            </Link>
        </StyledHeader>
    )
}

export default Header