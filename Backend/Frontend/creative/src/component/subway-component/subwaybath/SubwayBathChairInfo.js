import styled from "styled-components";

const StyledBathChair = styled.div`
width:100%;
display:flex;

font-size:32px;
font-family: 'Pretendard-Regular';
font-style: normal;
font-weight: 600;
margin-left:23px;
@media (max-width:500px){
    font-size:4vw;
}
`


const SubwayBathchairInfo = ({ mvContDtl }) => {
    return (
        <StyledBathChair>
            <p>{mvContDtl}</p>
        </StyledBathChair>
    )
}

export default SubwayBathchairInfo;