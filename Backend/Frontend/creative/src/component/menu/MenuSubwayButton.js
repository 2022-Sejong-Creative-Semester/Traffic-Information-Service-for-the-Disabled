import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { MapActions } from '../../store/Map-slice'

const StyledButton = styled.button`
width: 442.5px;
height: 537px;
font-size: 60px;
color: #FFFFFF;
font-family: 'Pretendard-Regular';
background: rgba(146, 85, 245, 0.8);
box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
border-radius: 20px 0px 0px 20px;
:hover{
    cursor: pointer;
}
@media (max-width:1630px){
    font-size: 3vw;
    width: 25vw;
    height: 60vh;
}
@media (max-width:500px){
    font-size: 6vw;
    width: 80vw;
    height: 10vh;
    margin-left:20vw;
}
`


const MenuSubwayButton = () => {
    const dispatch = useDispatch();
    const initialization = () => {
        dispatch(MapActions.initialization())
    }
    return (
        <StyledButton onClick={initialization}>
            지하철<br />편의시설
        </StyledButton>
    )

}

export default MenuSubwayButton