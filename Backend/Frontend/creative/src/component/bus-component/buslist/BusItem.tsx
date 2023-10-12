import React from "react";
import styled from "styled-components";

const StyledBusItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  list-style: none;
  text-align: center;
  border-bottom: 1px solid #d2d2d2;
  font-family: "Pretendard-Regular";
  .mark {
    width: 1.5vw;
    height: 1.5vw;
    margin-right: 0.8vw;
  }
  :hover {
    cursor: pointer;
  }
  a {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
    text-decoration: none;
  }
  div {
    display: flex;
    align-items: center;
  }
  .Name {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 20px;
    font-family: "Pretendard-Regular";
    font-style: normal;
    font-weight: 600;
    font-size: 2vw;
    line-height: 60px;
    margin-right: 10px;
  }
  .direction {
    font-family: "Pretendard-Regular";
    font-style: normal;
    font-weight: 600;
    font-size: 1.3vw;
    line-height: 29px;
  }
  .id {
    padding-right: 20px;
    font-family: "Pretendard-Regular";
    font-style: normal;
    font-weight: 600;
    font-size: 1.5vw;
    line-height: 29px;
    color: #9c9c9c;
  }

  @media (max-width: 500px) {
    height: 28%;
    .Name {
      font-size: 5vw;
    }
    .direction {
      font-size: 3vw;
    }
    .id {
      font-size: 3vw;
    }
    .mark {
      width: 100%;
      height: 100%;
      margin-right: 2vw;
    }
  }
`;

const BusItem = (props:any) => {
  const { busrouteid, busrouteAbrv, adirection, arrmsg1 } = props.items;

  return (
    <StyledBusItem>
      <a
        href={`https://map.naver.com/v5/search/${busrouteAbrv}번버스/bus-route/${busrouteid}?c=0,0`}
        target="_blank"
        rel="noreferrer"
      >
        <div>
          <p className="Name">
            <img alt="mark" className="mark" src="./image/MARK.png" />
            {busrouteAbrv}
          </p>
          <p className="direction">{adirection}방면</p>
        </div>
        <p className="id">{arrmsg1}</p>
      </a>
    </StyledBusItem>
  );
};

export default BusItem;