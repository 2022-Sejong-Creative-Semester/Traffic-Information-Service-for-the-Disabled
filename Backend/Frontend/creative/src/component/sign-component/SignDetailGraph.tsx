import React from "react";
import styled from "styled-components";


interface graphItem {
    label:string,
    portion:number,
    sum:number
}

const StyleSignDetailGraph = styled.div`
    display: flex;
    width:100%;
    height: 3vh;
    background-color: #D9D9D9;
    justify-content: space-between;
    border-radius: 10px;
`
const StyleSignDetailGraphLi = styled.div<graphItem>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-width: ${props => ((props.portion/props.sum)*100)}%;
    background-color: ${props=>(props.label)};
    border-radius: 10px;
    margin-right: 1%;
    color:#F0F0F0;
    font-family: "Pretendard-Regular";
    font-style: normal;
`

const SignDetailGraph = ({graph}:any) => {
    const idColor = ["#0052A4", "#00A84D", "#EF7C1C", "#00A5DE", "#996CAC", "#CD7C2F", "#747F00", "#E6186C","#BDB092"];
    const busColor = "#70EB37"
    return (
        <StyleSignDetailGraph>
            {graph.subPath.map((ele:any,index:number)=>{
                if(ele.sectionTime!==0){
                    let color="#D9D9D9";
                    if(ele.trafficType===1){
                        color = idColor[ele.lane[0].subwayCode-1]
                    }
                    else if(ele.trafficType===2){
                        color = busColor;
                    } 
                    return (
                        <StyleSignDetailGraphLi key={index} label={color} sum={graph.info.totalTime} portion={ele.sectionTime}>
                            {ele.sectionTime}분
                        </StyleSignDetailGraphLi>
                    )
                }
            })}
        </StyleSignDetailGraph>
    )
}

export default SignDetailGraph;