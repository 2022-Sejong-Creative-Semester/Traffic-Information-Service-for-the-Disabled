import React from "react";
import { useState } from "react";
import styled from "styled-components";

const StyledBusTimer = styled.div``;

const BusTimer = (props:any) => {
  const [timer,setTimer] = useState(props.timer);
  console.log(props.timer)
  setInterval(() => {}, 1000);
  return <StyledBusTimer>{timer}</StyledBusTimer>;
};

export default BusTimer;
