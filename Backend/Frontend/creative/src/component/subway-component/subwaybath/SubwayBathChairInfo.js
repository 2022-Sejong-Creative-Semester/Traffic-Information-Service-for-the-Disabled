import styled from "styled-components";

const StyledBathChair = styled.div`
width:100%;
display:flex;
font-size:35px;
font-family: 'Pretendard-Regular';
margin-left:30px;

`


const SubwayBathchairInfo = ({ mvContDtl }) => {
    return (
        <StyledBathChair>
            <p>{mvContDtl}</p>
        </StyledBathChair>
    )
}

export default SubwayBathchairInfo;