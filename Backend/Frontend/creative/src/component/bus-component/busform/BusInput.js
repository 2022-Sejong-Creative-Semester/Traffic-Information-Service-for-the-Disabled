import styled from "styled-components"

const StyledInput = styled.input`
width: 621px;
height: 60px;
padding: 15px;
font-size: 50px;
border:0;
`

const BusInput = () => {
    return (
        <StyledInput placeholder="버스정류장 이름을 입력해주세요." />
    )
}

export default BusInput