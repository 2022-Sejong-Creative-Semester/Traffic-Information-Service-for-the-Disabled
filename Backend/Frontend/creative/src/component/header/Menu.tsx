import React from 'react';
import styled from 'styled-components';
import {ReactComponent as CLOSE} from "./menuSvg/CLOSE.svg";
import { NavLink } from 'react-router-dom';

interface MenuProps {
    isOpen: boolean;
    onClose: () => void;
  }

const MenuContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  transition: left 0.3s ease-in-out, background-color 0.3s ease-in-out;
  z-index: 15;
`;
const CloseIcon = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
  cursor: pointer;
`;


const MenuContent = styled.div`
  background-color: #FFD12D;
  display: flex;
  flex-direction: column;
  width: 40vw;
  height: 100vh;
  z-index: 1000; 
`;

const StyleMenuBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1em;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #FFFFFF;
  font-size: 4vw;
  margin: 1em 0;
`;

const Menu: React.FC<MenuProps> = ({ isOpen,onClose}) => {
    const handleCloseMenu = () =>{
        onClose();
    }

  return (   
  <MenuContainer isOpen={isOpen}>
    <MenuContent>
        <CloseIcon>
        <CLOSE onClick={handleCloseMenu}/>
        </CloseIcon>
        <StyleMenuBar>
          <StyledNavLink to="/">홈</StyledNavLink>
          <StyledNavLink to="/bus">저상버스 안내</StyledNavLink>
          <StyledNavLink to="/subway">지하철 편의시설 안내</StyledNavLink>
          <StyledNavLink to="/sign">길찾기</StyledNavLink>
        </StyleMenuBar>
    </MenuContent>
  </MenuContainer>);
};

export default Menu;
