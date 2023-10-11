import React from "react";
import { useState } from "react";
import styled from "styled-components";

const StyledBusTimer = styled.div``;

const BusTimer = (props:any) => {
  const [Timer] = useState(props.timer);
  setInterval(() => {}, 1000);
  return <StyledBusTimer>{Timer}</StyledBusTimer>;
};

export default BusTimer;
