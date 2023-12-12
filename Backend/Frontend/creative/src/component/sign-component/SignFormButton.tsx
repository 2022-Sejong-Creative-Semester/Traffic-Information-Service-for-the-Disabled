import React from "react"
import styled from "styled-components"
import { useDispatch,useSelector } from "react-redux"
import { SignActions } from "../../store/Sign-slice.ts"
import { RootState } from "../../store/index";

import {submitStartAndEnd} from "./signUtil.tsx";
const StyleButton = styled.button`
    height: 4vh;
    border-radius: 15px;
    color: #FFFFFF;
    background-color: #FFD12D;
    border: none;
    font-family: 'Pretendard-Regular';
    font-weight: 700;
`

const SignFormButton = ({value}:{value:string}) => {
    const dispatch = useDispatch();
    let start = useSelector((state:RootState)=>state.sign.startPostion);
    let end = useSelector((state:RootState)=>state.sign.endPostion);
    
    const ClickBtn = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(value==="길찾기") submitPosition();
        else dispatch(SignActions.initialization(value));
    }
    
    const submitPosition = () => {
        if(start.tmX!==-1&&end.tmX!==-1)
            submitStartAndEnd(start,end);
    }
    
    return (
        <StyleButton onClick={ClickBtn}>  
            {value}
        </StyleButton>
    )

}



export default SignFormButton