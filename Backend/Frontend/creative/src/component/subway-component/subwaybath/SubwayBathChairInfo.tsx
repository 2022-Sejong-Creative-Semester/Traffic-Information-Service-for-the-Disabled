import React from "react";
import styled from "styled-components";

const StyledBathChair = styled.div`
  width: 90%;
  display: flex;
  .body {
    font-size: 1em;
    margin: 0;
    margin-bottom: 1vw;
  }
  font-family: "Pretendard-Regular";
  font-style: normal;
  font-weight: 600;
`;

const SubwayBathchairInfo = (props:any) => {
  const {mvContDtl} = props;
  return (
    <StyledBathChair>
      <p className="body">{mvContDtl}</p>
    </StyledBathChair>
  );
};

export default SubwayBathchairInfo;
