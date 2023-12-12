import React from "react";

import SignFormButton from "./SignFormButton.tsx";

import styled from "styled-components";

const StyledForm = styled.div`
    display: flex;
    position: fixed;
    z-index: 10;
    top: 15vh;
    height: 1vh;
    width: 85vw;
    .signFormInput{
      width: 100%;
      padding: 1em;
      font-size: 80%;
      font-family: 'Pretendard-Regular';
      font-weight: 700;
      border: 0;
      border-radius: 30px;
    }
`


const SignForm = () =>{
    return (
        <StyledForm>
            <SignFormButton value="시작위치 마커"/>
            <SignFormButton value="도착 위치 마커"/>
            <SignFormButton value="길찾기"/>
        </StyledForm>
    )
}

export default SignForm;