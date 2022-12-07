import styled from "styled-components";

const StyleMenuExplan = styled.div`
display:flex;
flex-direction:column;
align-items:center;
width: auto;
color:#E2E2E2;
.first{
    font-family: 'GmarketSansMedium';
    font-weight: 700;
    font-size: 70px;
}
.second{
    display:flex;
    text-align:center;
    font-family: 'Pretendard-Regular';
    font-size: 40px;
}

`

const MenuExplan = () => {

    return (
        <StyleMenuExplan>
            <h1 className="first">편리하고 쉽게, 타자.</h1>
            <p className="second">교통약자도 대중교통을 쉽게 탈 수 있을때까지.<br />교통약자에게 필요한 서비스를 제공합니다.</p>
        </StyleMenuExplan>
    )
}

export default MenuExplan;