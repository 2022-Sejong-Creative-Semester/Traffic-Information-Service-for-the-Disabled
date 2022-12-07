import styled from "styled-components";


const StyledBusPanel = styled.div`
display:flex;
flex-direction:column;
align-items:center;
text-align:center;
width: 348px;
height: 795x;
margin-right:30px;
font-family: 'Pretendard-Regular';
background: linear-gradient(270.31deg, #999C0D -27.07%, rgba(205, 208, 41, 0) 206.73%);
.first{
    font-size: 50px;
    color: #FFFFFF;
}
.second{
    font-size: 30px;
    color: #FFFFFF;
}
`

const BusPanel = () => {
    return (
        <StyledBusPanel>
            <p className="first">저상버스</p><br />
            <p className="second">저상버스가 오는 <br /> 정류장만 표시됩니다.</p>
        </StyledBusPanel>
    )
}

export default BusPanel