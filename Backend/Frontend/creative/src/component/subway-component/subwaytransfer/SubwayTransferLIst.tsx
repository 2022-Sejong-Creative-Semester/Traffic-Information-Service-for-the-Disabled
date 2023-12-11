import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
const StyledSubwayTransferDetail = styled.main`
    display:flex;
    flex-direction:column;
    align-items: start;
    justify-content: space-evenly;
    width: 98vw;
    height: 40vh;
    background-color:white;
    border: 4px solid #FFD12D;
    overflow: auto;
    .TransferLink{
        width: 100%;
        text-decoration:none;
        list-style:none;
        color: #000000;
    }
`

const StyledTransferDetailLi = styled.span`
     font-family: 'Pretendard-Regular';
     font-weight: 600;
     margin-left: 5%;
     border-bottom: 1px solid;
     font-size: 1em;
`
const SubwayTranferDetail = (props:any) => {
    const param = useParams();
    const {tranfer} = props;
    const {sourceStation, transferStation} = tranfer.transferDetail.read();
    return(
        <StyledSubwayTransferDetail>
            {sourceStation.map((sor:any)=>(
                (transferStation.map((tran:any)=>(
                    <Link to={`/subway/transfer/detail/${param.stCd}/${param.stNm}/${param.railCd}/${param.lnCd}/${sor.stCd}/${tran.lnCd}/${tran.stCd}`} key={sor.stCd+tran.stCd} className="TransferLink">
                        <StyledTransferDetailLi>
                            {sor.stNm} - {tran.stNm}
                        </StyledTransferDetailLi>
                    </Link>
                )))
            ))}
        </StyledSubwayTransferDetail>
    )
}

export default SubwayTranferDetail