import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { MapActions } from '../../store/Map-slice'

const StyledButton = styled.button`
width: 800px;
height: 240px;
border-radius: 30px;
font-size: 500%;
line-height: 125px;
`


const MenuButton = (props) => {
    const dispatch = useDispatch();
    const initialization = () => {
        dispatch(MapActions.initialization())
    }
    return (
        <StyledButton onClick={initialization}>
            {props.name}
        </StyledButton>
    )

}

export default MenuButton