import styled from "styled-components"


const StyledInput = styled.input`
width: 621px;
height: 60px;
padding: 15px;
font-size: 50px;
border:0;
font-family: 'Pretendard-Regular';
`

const SubwayInput = () => {



    return (
        <StyledInput placeholder="역 이름을 입력해주세요." />
    )
}

export default SubwayInput