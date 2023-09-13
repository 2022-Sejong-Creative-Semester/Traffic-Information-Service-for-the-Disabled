import styled from "styled-components";

const StyledBathChair = styled.div`
  width: 90%;
  display: flex;
  .title {
    font-size: 2vw;
    margin: 1.8vw;
  }
  .body {
    font-size: 1.7vw;
    margin: 0;
    margin-bottom: 1vw;
  }
  font-family: "Pretendard-Regular";
  font-style: normal;
  font-weight: 600;
  @media (max-width: 500px) {
    font-size: 4vw;
    width: 90%;
    height: 80vw;
    .title {
      font-size: 4vw;
      margin: 1.8vw;
    }
    .body {
      font-size: 3vw;
      margin: 0;
      margin-bottom: 2vw;
    }
  }
`;

const SubwayBathchairInfo = ({ mvContDtl, direction }) => {
  return (
    <StyledBathChair>
      <p className="title">{direction}</p>
      <p className="body">{mvContDtl}</p>
    </StyledBathChair>
  );
};

export default SubwayBathchairInfo;
