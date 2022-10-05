import styled from 'styled-components'

const StyledButton = styled.button`
width: 1083px;
height: 240px;
border-radius: 30px;
font-size: 100px;
line-height: 125px;
`


const MenuButton = (props) => {
    return (
        <StyledButton>
            {props.name}
        </StyledButton>
    )

}

export default MenuButton