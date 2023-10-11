import React from "react";
import styled from "styled-components";
import SubwayBathchairInfo from "../subwaybath/SubwayBathChairInfo";

const StyledInfo = styled.div`
display:flex;
flex-direction:column;
width: 720px;
height: 720px;
background-color:white;
border: 4px solid #9255F5;
overflow:auto;

@media (max-width:500px){
    margin:0;
    width: 98%;
    height:80vw;

}
`

const SubwayInfo = (props:any) => {
    const {info} = props;
    return (
        <StyledInfo>
            {info.map((element:any) => (
                element.map((node:any) => (
                    <SubwayBathchairInfo
                        direction={node.direction}
                        key={node.mvTpOrdr}
                        mvContDtl={node.mvContDtl}
                    />
                ))
            ))}
        </StyledInfo>
    )
}


export default SubwayInfo