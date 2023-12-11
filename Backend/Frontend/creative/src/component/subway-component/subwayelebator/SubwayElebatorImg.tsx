import React from 'react';
import styled from 'styled-components';

const StyledElevatorImg = styled.img`
  width: 100vw;
`;

const SubwayElebatorImg = (props:any) => {
    const {elevator} = props;
    return (
        <StyledElevatorImg alt="elevator" src={elevator.ele.read()[0].imgPath} />
    );
};

export default SubwayElebatorImg;
