import React,{Suspense} from "react";
import styled from "styled-components";
import SubwayMain from "./SubwayMain";
import getBusDetail from "../../../hook/getBusDetail.tsx"
import { useParams } from "react-router-dom"

const StyledDetailMain = styled.main`
display:flex;
flex-direction:column;
width: 98vw;
height: 40vh;
background-color:white;
border: 4px solid #FFD12D;
`

const SubwayDetailMain = () => {
    const params = useParams()
    const stCd = params.stCd;
    const stNm = params.stNm;
    return (
        <StyledDetailMain>
            <Suspense fallback={<div>Loding...</div>}>
                <SubwayMain info={getBusDetail(stCd,stNm)}/>
            </Suspense>
        </StyledDetailMain>
    )
}


export default SubwayDetailMain;