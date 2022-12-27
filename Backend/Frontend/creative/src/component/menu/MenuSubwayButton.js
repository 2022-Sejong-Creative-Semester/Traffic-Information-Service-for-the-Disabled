import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { MapActions } from '../../store/Map-slice'
import { Link } from "react-router-dom"
import { BusActions } from '../../store/Bus-slice'
import { SubwayActions } from '../../store/Subway-slice'
const StyledButton = styled.button`
width: 442.5px;
height: 537px;
font-size: 60px;
border:none;
font-family: 'Pretendard-Regular';
font-weight: 600;
background: rgba(146, 85, 245, 0.8);
box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
border-radius: 20px 0px 0px 20px;
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
    margin-left:80%;
}
.subtext{
    width:50%;
}
.SUBWAY{
    width:4.5vw;
    height:5vw;
    margin-left:10%;
}

:hover{
    cursor: pointer;
    opacity:1;
}
@media (max-width:1630px){
    font-size: 4vw;
    width: 26vw;
    height: 60vh;
    .subtext{
        width:55%;
    }
}
@media (max-width:500px){
    font-size: 6vw;
    width: 80vw;
    height: 10vh;
    margin:20vw;
    .SUBWAY{
        width:6.5vw;
        height:7vw;
    }
    a{
        justify-content:space-evenly;
        flex-direction:row;
        align-items:center;
    }
    .RIGHT{
        width:30vw;
        height:5vw;
        margin-left:8%;
    }
    .image{
        margin-bottom:4vw;
    }
}
`


const MenuSubwayButton = () => {
    const dispatch = useDispatch();
    const initialization = () => {
        dispatch(MapActions.initialization())
        dispatch(BusActions.initialState())
        dispatch(SubwayActions.initialtrans())
        dispatch(MapActions.Onsubwaymode())
    }
    return (
        <StyledButton onClick={initialization}>
            <Link to="/subway">
                <p className='subtext'>지하철 편의시설</p>
                <div className="image">
                    <img className="SUBWAY" src="./image/SUBWAY.png" alt="GRASS" />
                    <img className="RIGHT" src="./image/RIGHT.png" alt="GRASS" />
                </div>
            </Link>
        </StyledButton>
    )

}

export default MenuSubwayButton