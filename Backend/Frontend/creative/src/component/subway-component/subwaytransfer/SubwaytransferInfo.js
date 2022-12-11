import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { api } from "../../auth/Api";
import { useState } from "react";

const StyledTransferInfo = styled.div`
display:flex;
flex-direction:column;
width: 680px;
height: 747px;
background-color:white;
border: 4px solid #9255F5;
overflow:auto;
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


const SubwayTransferInfo = () => {
    const { prev, next } = useSelector(state => state.subway.transferDetail)
    const si = useSelector(state => state.subway.subwayInfo)
    const [path, setPath] = useState()
    useEffect(() => {
        const getTransfer = async () => {
            await api.get(`subway/transferMove/transferInfo/${si.stCd}/${si.stNm}/${si.railCd}/${si.lnCd}/${prev.stCd}/${next.lnCd}/${next.stCd}`)
                .then(res => {
                    const { data } = res;
                    setPath(data)
                })
        }
        getTransfer()
    }, [prev, next])
    return (
        <StyledTransferInfo>
            <header className="title">{[`${prev.lnCd}호선 ${prev.stNm}방면 ->`, <br />, `${next.lnCd}호선 ${next.stNm}방면`]}</header>
            {path?.map(element => (
                <p className="path" key={element.mvContDtl}>{element.mvContDtl}</p>
            ))}
        </StyledTransferInfo>
    )
}

export default SubwayTransferInfo;