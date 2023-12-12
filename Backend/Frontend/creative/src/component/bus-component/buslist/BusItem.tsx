import React from "react";
import styled from "styled-components";

const StyledBusItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 10%;
  list-style: none;
  text-align: center;
  border-bottom: 1px solid #d2d2d2;
  font-family: "Pretendard-Regular";
  .mark {
    width: 1em;
    height: 1em;
    margin-right: 0.5rem;
  }
  :hover {
    cursor: pointer;
  }
  a {
    width: 100%;
    height: 100%;
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
    font-size: 1em;
    line-height: 60px;
    margin-right: 10px;
  }
  .direction {
    font-family: "Pretendard-Regular";
    font-style: normal;
    font-weight: 600;
    font-size: 0.8em;
    line-height: 29px;
  }
  .id {
    padding-right: 20px;
    font-family: "Pretendard-Regular";
    font-style: normal;
    font-weight: 600;
    font-size: 0.8em;
    line-height: 29px;
    color: #9c9c9c;
  }
`;
//https://map.naver.com/p/search/[버스번호]%EB%B2%88%EB%B2%84%EC%8A%A4?c=15.00,0,0,0,dh
const BusItem = (props:any) => {
  const { busrouteid, busrouteAbrv, adirection, arrmsg1 } = props.items;
  console.log(props)
  return (
    <StyledBusItem>
      <a
        href={`https://map.naver.com/p/search/${busrouteAbrv}%EB%B2%88%EB%B2%84%EC%8A%A4?c=15.00,0,0,0,dh`}
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
