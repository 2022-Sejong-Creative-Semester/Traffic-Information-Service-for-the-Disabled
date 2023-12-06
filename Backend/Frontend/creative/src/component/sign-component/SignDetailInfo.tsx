import React from "react";
import styled from "styled-components";

const StyledSignDetailInfo = styled.div`
    display: flex;
    flex-direction: column;
`

const StyledSignDetailInfoLi = styled.div`
    display: flex;
    flex-direction: column;
    margin:1em 0;
    font-family: "Pretendard-Regular";
    font-style: normal;
    .SignDetail{
        margin-top: 1px;
    }
`

const SignDetailInfo = ({graph}:any) => {
    
    return (
        <StyledSignDetailInfo>
            {graph.subPath.map((ele:any,index:number)=>{
                if(ele.trafficType!==3){
                    let name = ele.lane[0].busNo?ele.lane[0].busNo:ele.lane[0].name
                    return (
                            <StyledSignDetailInfoLi key={index}>
                                <span>{name}</span>
                                <div className="SignDetail">
                                    <span>{ele.endName} - </span>
                                    <span>{ele.startName}</span>
                                </div>
                            </StyledSignDetailInfoLi>
                    )
                }
            })}
        </StyledSignDetailInfo>
    )
}

export default SignDetailInfo;