import React from "react";
import styled from "styled-components";

interface subDetail {
    idColor:string[];
    line:number;
}

const SubwayMain = (props:any) => {
    const {info}:any = props;
    const {
      lnCd,
        stNm,
        roadNm,
        wNum,
        eName,
        fCode,
      } = info.subway.read();
    const idColor = [
        "#0052A4",
        "#00A84D",
        "#EF7C1C",
        "#00A5DE",
        "#996CAC",
        "#CD7C2F",
        "#747F00",
        "#E6186C",
    ];
  return (
    <StyledSubwayDeatil line={lnCd} idColor={idColor}>
      <div className="name">
        <span className="line">{lnCd}</span>
        <span>{stNm}</span>
      </div>
      <div className="info">
        <span>
          <img alt="info-images" className="info-image" src="./image/phone.png" />
          {roadNm}
        </span>
        <span>
          교통약자 도우미 전화번호
          <br />
          {wNum}
        </span>
        <span>지하철역 영문명: {eName}</span>
        <span>지하철역 FR_CODE: {fCode}</span>
      </div>
    </StyledSubwayDeatil>
  );
};

const StyledSubwayDeatil = styled.div<subDetail>`
  width: 100%;
  .info-image {
    width: 1em;
    height: 1em;
  }
  .name {
    font-family: 'Pretendard-Regular';
    display: flex;
    align-items: center;
    width: 96%;
    min-height: 20%;
    font-weight: 600;
    font-size: 1em;
    padding-left: 4%;
    border-bottom: 4px solid #ffd12d;
  }
  .line {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-style: normal;
    font-size: 100%;
    font-weight: 600;
    width: 1.4em;
    height: 1.4em;
    background-color: ${(props) => props.idColor[props.line - 1]};
    border-radius: 20px;
  }
  .info {
    font-family: 'Pretendard-Regular';
    width: 96%;

    display: flex;
    flex-direction: column;
    font-weight: 600;
    font-size: 100%;
    padding-left: 4%;
    padding-top: 4%;
  }
  .info span {
    width: 100%;
    margin-bottom: 1em;
  }
`;

export default SubwayMain;
