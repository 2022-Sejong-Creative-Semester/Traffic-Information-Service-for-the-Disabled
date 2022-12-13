import styled from "styled-components";

const StyledDetail = styled.div`
display:flex;
flex-direction:column;
width: 749px;
height: 747px;
background-color:white;
margin:0;
border: 4px solid #9255F5;
.info-image{
    width: 1.8vw;
    height: 1.8vw;
}
.name{
    font-family: 'Pretendard-Regular';
    display:flex;
    align-items:center;
    width:100%;
    height:auto;
    font-weight: 600;
    font-size: 40px;
    border-bottom: 4px solid #9255F5;
}
.name p{
    margin-left:26px;
}
.line{
    display:flex;
    justify-content:center;
    align-items:center;
    color:#FFFFFF;
    font-style: normal;
    font-weight: 600;
    font-size: 70%;
    width: 48px;
    height: 48px;
    background-color:#A76E00;
    border-radius:200px;   
}
.info{
    font-family: 'Pretendard-Regular';
    width:100%;
    display:flex;
    flex-direction:column;
    font-weight: 600;
    font-size: 30px;
    padding-left:1vw;
}
p{
    display:flex;
    justify-content:start;
}

@media (max-width:500px) {
    border: 2px solid #9255F5;
    width:99%;
    height:80vw;
    .info-image{
        width: 4.5vw;
        height: 4.5vw;
    }
    .line{
        width: 8vw;
        height: 8vw;
    }
    .name{
        height:15vw;
        font-size:5vw;
    }
    .name p{
        margin-left:3vw;
    }
    .info{
        padding-left:3vw;
        font-size:4vw;
        width:90%;
    }
}
`


const SubwayDetail = ({ info }) => {
    return (
        <StyledDetail>
            <div className="name">
                <p className="line">{info.lnCd}</p>
                <p>{info.stNm}</p>
            </div>
            <div className="info">
                <p><img className="info-image" src="./image/phone.png" />{info.roadNm}</p>
                <p><img className="info-image" src="./image/Call.png" />{info.tNum}</p>
                <p>교통약자 도우미 <br /> {info.wNum}</p>
            </div>
        </StyledDetail>
    )
}

export default SubwayDetail;