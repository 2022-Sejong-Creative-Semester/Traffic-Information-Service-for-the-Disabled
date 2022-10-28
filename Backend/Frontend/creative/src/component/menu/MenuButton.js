import styled from 'styled-components'

const StyledButton = styled.button`
width: 100%;
height: 240px;
border-radius: 30px;
font-size: 500%;
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