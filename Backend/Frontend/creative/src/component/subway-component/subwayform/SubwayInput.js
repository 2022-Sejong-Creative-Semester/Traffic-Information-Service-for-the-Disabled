import styled from "styled-components"


const StyledInput = styled.input`
width: 80%;
height: 8.5vh;
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

const SubwayInput = () => {



    return (
        <StyledInput placeholder="역 이름을 입력해주세요." />
    )
}

export default SubwayInput