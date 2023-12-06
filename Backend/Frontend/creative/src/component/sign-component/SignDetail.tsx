import React from "react"
import styled from "styled-components"
import useSignForm from "../../hook/useSignForm.tsx";
import SignDetailGraph from "./SignDetailGraph.tsx";
import SignDetailInfo from "./SignDetailInfo.tsx";

const StyledSignDetail = styled.main`
    width: 90%;
    height: 80%;
    display: flex;
    flex-direction: column;
    font-family: "Pretendard-Regular";
    font-style: normal;
    overflow: auto;
    .detail{
        margin-top: 1.2em;
        padding-bottom: 1em;
        border-bottom: solid 1px;
    }
`

const SignDetail = () => {
    const arr = useSignForm();
    return (
        <StyledSignDetail>
            {arr[0].length!==0&&arr[0].map((ele:any,index:number)=>{
                return (
                    <div className="detail" key={index}>
                        <span>{ele.info.totalTime}분</span>
                        <SignDetailGraph graph={ele}/>
                        <SignDetailInfo graph={ele}/>
                    </div>
                )
            })}
        </StyledSignDetail>
    )
}


export default SignDetail;