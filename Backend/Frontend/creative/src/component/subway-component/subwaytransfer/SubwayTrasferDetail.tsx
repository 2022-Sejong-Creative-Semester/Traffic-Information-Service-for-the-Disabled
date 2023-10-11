import React from "react";
import styled from "styled-components";
import SubwayTransferItems from "./SubwayTransferItem";
import { useSelector } from "react-redux";
import {AppDispatch} from "../../../store/index"

const StyledTransferDetail = styled.div`
display:flex;
flex-direction:column;
width: 720px;
height: 720px;
background-color:white;
border: 4px solid #9255F5;
overflow:auto;
margin-right: 20px;
.title{
    margin:30px;
    font-size: 40px;
    font-weight: 600;
    font-family: 'Pretendard-Regular';
    text-align:center;
}
.path{
    margin:30px;
    font-size: 30px;
    font-weight: 600;
    font-family: 'Pretendard-Regular';
}

@media (max-width:500px) {
    width:98%;
    height:80vw;
    margin-right:0;
    .title{
        margin:4vw;
        font-size: 6vw;
    }
    .path{
        margin:4vw;
        font-size: 4.5vw;
    }
}
`


const SubwayTransferDetail = (props:any) => {
    const [prev, next] = props.info;
    const transCheck = useSelector((state:AppDispatch) => state.subway.transferDetail.transferImage)
    const transRoad = useSelector((state:AppDispatch) => state.subway.transferDetail.transRoad)
    const transset = useSelector((state:AppDispatch) => state.subway.transprevnext)
    return (
        <StyledTransferDetail>
            {!transCheck && prev.sourceStation.map((prev:any)=> (
                next.transferStation.map((next:any) => (
                    <SubwayTransferItems
                        key={prev.stCd + next.stCd}
                        items={{ prev, next }} />
                ))
            ))}
            {transCheck && <header className="title">{[`${transset.prev.lnCd}호선 ${transset.prev.stNm}방면 ->`, <br />, `${transset.next.lnCd}호선 ${transset.next.stNm}방면`]}</header>}
            {transCheck && transRoad.map((element:any) => (
                <p className="path">{element.mvContDtl}</p>
            ))}

        </StyledTransferDetail>
    )
}

export default SubwayTransferDetail;