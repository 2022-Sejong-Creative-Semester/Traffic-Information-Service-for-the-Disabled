import styled from "styled-components";
import SubwayBathchairInfo from "../subwaybath/SubwayBathChairInfo";

const StyledInfo = styled.div`
display:flex;
flex-direction:column;
width: 749px;
height: 747px;
background-color:white;
border: 4px solid #9255F5;
overflow:auto;

@media (max-width:500px){
    margin:0;
    width: 98%;
    height:80vw;

}
`

const SubwayInfo = ({ info }) => {
    console.log(info)
    return (
        <StyledInfo>
            {info.map((element) => (
                element.map(node => (
                    <SubwayBathchairInfo
                        key={node.mvTpOrdr}
                        mvTpOrdr={node.mvTpOrdr}
                        mvContDtl={node.mvContDtl}
                    />
                ))
            ))}
        </StyledInfo>
    )
}


export default SubwayInfo