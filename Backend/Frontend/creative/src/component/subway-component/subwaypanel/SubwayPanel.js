import styled from "styled-components";


const StyledSubwayPanel = styled.div`
display:flex;
flex-direction:column;
align-items:center;
text-align:center;
width: 348px;
height: 795x;
margin-right:30px;
font-family: 'GmarketSansMedium';
background: linear-gradient(270deg, #7C34F3 -44.25%, rgba(146, 85, 245, 0) 222.13%);
.first{
    font-size: 50px;
    color: #FFFFFF;
}
.second{
    font-size: 30px;
    color: #FFFFFF;
}
`

const SubwayPanel = (props) => {

    return (
        <StyledSubwayPanel>
            <p className="first">{props.text}</p>
        </StyledSubwayPanel>
    )
}

export default SubwayPanel