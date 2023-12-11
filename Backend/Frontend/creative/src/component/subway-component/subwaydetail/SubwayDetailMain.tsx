import React,{Suspense} from "react";
import styled from "styled-components";
import SubwayMain from "./SubwayMain";
import Loding from "../../loding/Loding.tsx";

import {getSubwayDetail} from "../../../utils/getSubwayApi.ts"
import { useParams } from "react-router-dom"

const StyledDetailMain = styled.main`
display:flex;
flex-direction:column;
justify-content: center;
align-items: center;
width: 98vw;
height: 36vh;
background-color:white;
border: 4px solid #FFD12D;
`

const SubwayDetailMain = () => {
    const params = useParams()
    const stCd = params.stCd;
    const stNm = params.stNm;
    return (
        <StyledDetailMain>
            <Suspense fallback={<Loding/>}>
                <SubwayMain info={getSubwayDetail(stCd,stNm)}/>
            </Suspense>
        </StyledDetailMain>
    )
}


export default SubwayDetailMain;