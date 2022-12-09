import styled from "styled-components"

const StyledInput = styled.input`
width: 80%;
height: 10vh;
padding: 15px;
font-size: 2.5vw;
border:0;
font-family: 'Pretendard-Regular';
@media (max-width:500px){
    font-family: 'Pretendard-Regular';
    width: 80%;
    height: 15vw;
    font-size: 6vw;
    padding: 1%;
}
`

const BusInput = () => {
    return (
        <StyledInput placeholder="정류장을 입력해주세요." />
    )
}

export default BusInput