import React from "react";
import styled from "styled-components";

interface subDetail {
    idColor:string[];
    line:number;
}

const SubwayDetail = (props:any) => {
    const {info} = props;
    const idColor = ["#0052A4", "#00A84D", "#EF7C1C", "#00A5DE", "#996CAC", "#CD7C2F", "#747F00", "#E6186C"];
    return (
        <StyledDetail idColor={idColor} line={info.lnCd}>
            <div className="name">
                <span className="line">{info.lnCd}</span>
                <span>{info.stNm}</span>
            </div>
            <div className="info">
                <span><img alt="info-images" className="info-image" src="./image/phone.png" />{info.roadNm}</span>
                <span> 교통약자 도우미 전화번호<br />{info.wNum}</span>
                <span>지하철역 영문명: {info.eName}</span>
                <span>지하철역 FR_CODE: {info.fCode}</span>
            </div>
        </StyledDetail>
    )
}

const StyledDetail = styled.div<subDetail>`
display:flex;
flex-direction:column;
width: 98vw;
height: 40vh;
background-color:white;
border: 4px solid #FFD12D;
.info-image{
    width: 1em;
    height: 1em;
}
.name{
    font-family: 'Pretendard-Regular';
    display:flex;
    align-items:center;
    width:96%;
    height:200%;
    font-weight: 600;
    font-size: 1em;
    padding-left:4%;
    border-bottom: 4px solid #FFD12D;
}
.line{
    display:flex;
    justify-content:center;
    align-items:center;
    color:#FFFFFF;
    font-style: normal;
    font-size: 100%;
    font-weight: 600;
    width: 1.4em;
    height: 1.4em;
    background-color:${props => (props.idColor[props.line - 1])};
    border-radius:20px;   
}
.info{
    font-family: 'Pretendard-Regular';
    width:96%;
    height: 800%;
    display:flex;
    flex-direction:column;
    font-weight: 600;
    font-size: 100%;
    padding-left:4%;
    padding-top:4%;
}
.info span{
    width:100%;
    margin-bottom: 1em;
}
`


export default SubwayDetail;