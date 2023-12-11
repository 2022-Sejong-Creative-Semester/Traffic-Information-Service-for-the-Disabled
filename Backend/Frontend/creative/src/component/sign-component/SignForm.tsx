import React from "react";

import SignFormButton from "./SignFormButton.tsx";

import styled from "styled-components";

const StyledForm = styled.form`
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
            <input placeholder="장소를 입력해주세요." className="signFormInput"/>
            <SignFormButton value="start"/>
            <SignFormButton value="end"/>
            <SignFormButton value="submit"/>
        </StyledForm>
    )
}

export default SignForm;