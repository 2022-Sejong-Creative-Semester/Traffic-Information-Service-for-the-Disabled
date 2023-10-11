import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
width: 100%;
font-family: 'SEBANG Gothic';
font-style: normal;
font-weight: 400;
font-size: 4rem;
line-height: 94px;
padding-bottom: 30px;
color: #000000;

`

const MenuHeader = () => {


    return (
        <StyledHeader>타자</StyledHeader>
    )
}

export default MenuHeader;