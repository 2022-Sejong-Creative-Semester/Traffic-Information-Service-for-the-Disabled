import styled from "styled-components";

const StyledSubwayNumber = styled.header`
display:flex;
justify-content: space-between;
line-height: 60px;
align-items:center;
height:50px;
width:90%;
height:auto;
font-size:30px;
padding:0;
font-family: 'Pretendard-Regular';
p{
    font-weight:bold;
    margin:0;
}
@media (max-width:500px){
    font-size:4.5vw;
    height:20%;
}
`

const SubwayNumber = (props) => {

    return (
        <StyledSubwayNumber>
            <p>검색결과{props.count}</p>
        </StyledSubwayNumber>
    )
}

export default SubwayNumber