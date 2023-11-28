import React from "react"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { SignActions } from "../../store/Sign-slice.ts"


const StyleButton = styled.button`
    height: 4vh;
    border-radius: 15px;
    color: #FFFFFF;
    background-color: #FFD12D;
    border: none;
`

const SignFormButton = ({value}:{value:string}) => {
    const dispatch = useDispatch();
    const ClickBtn = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(SignActions.initialization(value))
    }
    return (
        <StyleButton onClick={ClickBtn}>  
            {value}
        </StyleButton>
    )

}



export default SignFormButton