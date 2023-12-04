import React from "react";
import styled from "styled-components";
import SubwayBathchairInfo from "../subwaybath/SubwayBathChairInfo.tsx";

const StyledInfo = styled.div`
display:flex;
flex-direction:column;
align-items: center;
width: 98vw;
height: 40vh;
background-color:white;
border: 4px solid #FFD12D;
overflow:auto;
.head{
    font-size: 1.2em;
    font-family: "Pretendard-Regular";
    font-style: normal;
    font-weight: 600;
    margin-top: 0;
}
.para{
    width: 95%;
    border-bottom: 1px solid;
    margin-bottom: 10px;
}
`

const SubwayInfo = (props:any) => {
    const {info} = props;
    return (
        <StyledInfo>
            {info.map((element:any) => {
                let {direction,info} = element;
                return (<div className="para">
                    <p className="head">{direction}</p>
                    {info.map((node:any)=>(
                    <SubwayBathchairInfo
                        direction={direction}
                        key={node.mvTpOrdr}
                        mvContDtl={node.mvContDtl}
                />
                ))}
                </div>)
            })}
        </StyledInfo>
    )
}


export default SubwayInfo