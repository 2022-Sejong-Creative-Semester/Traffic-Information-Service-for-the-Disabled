import styled from "styled-components";


const StyledTransferDetail = styled.div`
display:flex;
flex-direction:column;
width: 749px;
height: 747px;
background-color:white;
border: 4px solid #9255F5;
overflow:auto;

@media (max-width:500px) {
    width:98%;
    height:80vw;
}
`


const SubwayTransferDetail = ({ info }) => {
    console.log(info)
    return (
        <StyledTransferDetail>

        </StyledTransferDetail>
    )
}

export default SubwayTransferDetail;