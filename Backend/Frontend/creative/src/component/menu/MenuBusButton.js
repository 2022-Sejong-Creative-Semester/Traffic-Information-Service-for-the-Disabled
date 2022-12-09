import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { MapActions } from '../../store/Map-slice'

const StyledButton = styled.button`
width: 442.5px;
height: 537px;
font-size: 60px;
color: #FFFFFF;
font-family: 'Pretendard-Regular';
background: rgba(205, 208, 41, 0.8);
box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
border-radius: 0px 20px 20px 0px;
:hover{
    cursor: pointer;
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
}
`


const MenuBusButton = () => {
    const dispatch = useDispatch();

    const initialization = () => {
        dispatch(MapActions.initialization())
    }
    return (
        <StyledButton onClick={initialization}>
            저상버스
        </StyledButton>
    )

}

export default MenuBusButton