import React,{useEffect, useState} from "react";
import styled from "styled-components";
import { api } from "../../auth/Api.ts"
import { Link } from "react-router-dom";

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
/*
/subway/transferMove/transferInfo/:stCd/:stNm/:railCd/:lnCd/:prevStinCd/:chthTgtLn/:chtnNextStinCd

*/

const SubwayTranferDetail = ({param}:any) => {
    const [source,setSource] = useState<[]>()
    const [transfer,setTransfer] = useState<[]>()
    useEffect(() => {
        const stCd = param.stCd;
        const stNm = param.stNm;
        const railCd = param.railCd;
        const lnCd = param.lnCd;
        const getDetail = async () => {
            await api.get(`/subway/transferMove/transferList/${stCd}/${stNm}/${railCd}/${lnCd}`)
                .then(res => {
                    const { data } = res;
                    const {sourceStation,transferStation} = data
                    setSource(sourceStation);
                    setTransfer(transferStation);
                }).catch(error=>{
                    alert("환승역이 아닙니다!")
                    window.location.href = `/#/subway/detail/${stCd}/${stNm}`
                })
        }
        getDetail()
    }, [param])
    return(
        <StyledSubwayTransferDetail>
            {source&&source.map((sor:any)=>(
                (transfer&&transfer.map((tran:any)=>(
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