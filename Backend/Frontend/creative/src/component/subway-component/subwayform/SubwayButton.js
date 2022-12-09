import styled from "styled-components"

const StyledButton = styled.button`
width: 16%;
height: 11vh;
background: #9255F5;
border: 1px solid #9255F5;

@media (max-width:500px){
    width:20%;
    height:100%;
}

`

const SubwayButton = () => {
    return (
        <StyledButton />
    )
}

export default SubwayButton