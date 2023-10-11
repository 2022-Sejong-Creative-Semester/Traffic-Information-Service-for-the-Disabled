import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { MapActions } from '../../store/Map-slice'
import { BusActions } from '../../store/Bus-slice'
import { SubwayActions } from '../../store/Subway-slice'
import { Link } from "react-router-dom"

const StyledButton = styled.button`
width: 442.5px;
height: 537px;
font-size: 60px;
border:none;
font-family: 'Pretendard-Regular';
font-weight: 600;
background: rgba(205, 208, 41, 0.8);
box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
border-radius: 0px 20px 20px 0px;
opacity:0.8;
a{ 
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    width: 100%;
    height: 70%;
    text-decoration:none;
    color: #FFFFFF;
}
.image{
    display:flex;
    flex-direction:column;
    align-items:center;
    width: 25%;
    height: 25%;
}
.RIGHT{
    width:18vw;
    height:5vw;
    margin-right:80%;
}
.BUS{
    width:6vw;
    height:6vw;
    margin-right:70%;
}
:hover{
    cursor: pointer;
    opacity:1;
}

@media (max-width:1630px){
    font-size: 4vw;
    width: 26vw;
    height: 60vh;
}
@media (max-width:500px){
    font-size: 6vw;
    width: 80vw;
    height: 10vh;
    .BUS{
        width:8vw;
        height:8vw;
    }
    a{
        justify-content:space-evenly;
        flex-direction:row-reverse;
        align-items:center;
    }
    .RIGHT{
        width:30vw;
        height:5vw;
    }
    .image{
        margin-bottom:4vw;
    }
}
`


const MenuBusButton = () => {
    const dispatch = useDispatch();

    const initialization = () => {
        dispatch(MapActions.initialization())
        dispatch(BusActions.initialState())
        dispatch(SubwayActions.initialtrans())
        dispatch(MapActions.Onbusmode())
    }
    return (
        <StyledButton onClick={initialization}>
            <Link to="/bus">
                <p>저상버스</p>
                <div className="image">
                    <img className="BUS" src="./image/BUS.png" alt="GRASS" />
                    <img className="RIGHT" src="./image/LEFT.png" alt="GRASS" />
                </div>
            </Link>
        </StyledButton>
    )

}

export default MenuBusButton