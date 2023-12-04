import React from "react";
import styled from "styled-components"


const StyledInput = styled.input`
      width: 100%;
      padding: 1em;
      font-size: 80%;
      font-family: 'Pretendard-Regular';
      font-weight: 700;
      border: 0;
      border-radius: 30px;
`

const SubwayInput = () => {
    return (
        <StyledInput placeholder="역 이름을 입력해주세요." />
    )
}

export default SubwayInput