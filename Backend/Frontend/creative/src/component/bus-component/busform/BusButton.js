import styled from "styled-components"

const StyledButton = styled.button`
width: 16%;
height: 11vh;
background: #CDD029;
border: 1px solid #CDD029;
padding:0;
@media (max-width:500px){
    width:20%;
    height:100%;
}

`

const BusButton = () => {
    return (
        <StyledButton />
    )
}

export default BusButton