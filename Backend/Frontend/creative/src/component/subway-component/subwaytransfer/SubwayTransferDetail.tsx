import React from "react";
import styled from "styled-components";

const StyledSubwayTransferDetail = styled.main`
    display:flex;
    flex-direction:column;
    align-items: start;
    justify-content: start;
    width: 98vw;
    max-height: 40vh;
    border: 4px solid #FFD12D;
    overflow: auto;
    `
const StyledTransferDetailLi = styled.span`
     font-family: 'Pretendard-Regular';
     font-weight: 600;
     margin: 2%;
     font-size: 1em;
`

const SubwayTranferDetail = (props:any) => {
    const {tranferdetail, setImage} = props;
    const tranferInfo = tranferdetail.transferinfo.read();
    setImage(tranferInfo[0].imgPath)
    return(
        <StyledSubwayTransferDetail>
                <StyledTransferDetailLi>
                    {tranferInfo[0].stMovePath} {">>"} {tranferInfo[0].edMovePath}
                </StyledTransferDetailLi>
            {tranferInfo.map((ele:any,index:number)=>(
                <StyledTransferDetailLi key={index}>
                    {ele.mvContDtl}
                </StyledTransferDetailLi>
            ))}
        </StyledSubwayTransferDetail>
    )
}

export default SubwayTranferDetail