import styled from "styled-components";

const StyleMenuExplan = styled.div`
width: 40%;
height: 231px;
font-family: 'Pretendard';
font-style: normal;
font-weight: 700;
font-size: 50px;
line-height: 60px;
letter-spacing: 0.05em;
font-color: #000000;
span{
   font-size: 35px;
   font-color:#7C7C7C;
}

`

const MenuExplan = () => {

    return (
        <StyleMenuExplan>
            교통약자<span>분들을 위해</span><br />
            편리하고 정확한<br />
            대중교통 정보<span>를</span> 제공<span>합니다.</span>
        </StyleMenuExplan>
    )
}

export default MenuExplan;