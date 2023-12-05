import React,{useEffect, useState} from "react";
import styled from "styled-components";
import { api } from "../../auth/Api.ts"

const StyledSubwayTransferDetail = styled.main`
    display:flex;
    flex-direction:column;
    align-items: start;
    justify-content: space-evenly;
    width: 98vw;
    height: 40vh;
    border: 4px solid #FFD12D;
    overflow: auto;
`
const StyledTransferDetailLi = styled.span`
     font-family: 'Pretendard-Regular';
     font-weight: 600;
     margin: 2%;
     font-size: 1em;
`

const SubwayTranferDetail = ({param,setImage}:any) => {
    const [tranferInfo,setTransferInfo] = useState<any>();
    useEffect(() => {
        const stCd = param.stCd;
        const stNm = param.stNm;
        const railCd = param.railCd;
        const lnCd = param.lnCd;
        const prevStinCd = param.prevStinCd;
        const chthTgtLn = param.chthTgtLn;
        const chtnNextStinCd = param.chtnNextStinCd;
        const getDetail = async () => {
            await api.get(`/subway/transferMove/transferInfo/${stCd}/${stNm}/${railCd}/${lnCd}/${prevStinCd}/${chthTgtLn}/${chtnNextStinCd}`)
                .then(res => {
                    const { data } = res;
                    setTransferInfo(data)
                    setImage(data[0].imgPath)
                }).catch(error=>{
                    console.log(error)
                })
        }
        getDetail()
    }, [param])
    return(
        <StyledSubwayTransferDetail>
            {tranferInfo&&(
                <StyledTransferDetailLi>
                    {tranferInfo[0].stMovePath} {">>"} {tranferInfo[0].edMovePath}
                </StyledTransferDetailLi>)}
            {tranferInfo&&tranferInfo.map((ele:any,index:number)=>(
                <StyledTransferDetailLi key={index}>
                    {ele.mvContDtl}
                </StyledTransferDetailLi>
            ))}
        </StyledSubwayTransferDetail>
    )
}

export default SubwayTranferDetail