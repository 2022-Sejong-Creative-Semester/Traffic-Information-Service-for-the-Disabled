import React from "react";
import styled from "styled-components";

const StyledSignDetailInfo = styled.div`
    display: flex;
    flex-direction: column;
`

const StyledSignDetailInfoLi = styled.div`
    display: flex;
    margin:1em 0;
    .SignDetail{
        margin-left: 1em;
    }
`

const SignDetailInfo = ({graph}:any) => {
    
    return (
        <StyledSignDetailInfo>
            {graph.subPath.map((ele:any)=>{
                if(ele.trafficType!==3){
                    let name = ele.lane[0].busNo?ele.lane[0].busNo:ele.lane[0].name
                    return (
                            <StyledSignDetailInfoLi>
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